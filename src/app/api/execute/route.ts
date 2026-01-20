
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeFile, mkdir, rm } from "fs/promises";
import { join } from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import os from "os";

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const { code, slug, language } = await req.json();

    if (!code || !slug || !language) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Fetch challenge variant harness files
    const challenge = await prisma.challenge.findUnique({
      where: { slug },
      include: {
        languageVariants: {
          where: { language },
        },
      },
    });

    const variant = challenge?.languageVariants[0];
    if (!variant) {
      return NextResponse.json(
        { error: "Language variant not found" },
        { status: 404 }
      );
    }

    // 2. Setup temporary environment
    const runId = uuidv4();
    const tmpDir = join(os.tmpdir(), "pattern-code-runs", runId);
    await mkdir(tmpDir, { recursive: true });

    try {
      // 3. Write files
      const harnessFiles = variant.harnessFiles as Record<string, string>;
      const starterFiles = variant.starterFiles as Record<string, string>;
      
      // Determine the filename for the user code
      // Usually it's the first file in starterFiles, e.g., "src/index.js" or "Solution.java"
      const userFileKeys = Object.keys(starterFiles);
      const userFileName = userFileKeys.length > 0 ? userFileKeys[0] : (language === 'java' ? 'Solution.java' : 'solution.py');
      
      // Write user code
      // Ensure directory exists for file
      const userFilePath = join(tmpDir, userFileName);
      await mkdir(join(tmpDir, userFileName.split('/').slice(0, -1).join('/')), { recursive: true });
      await writeFile(userFilePath, code);

      // Write harness files
      for (const [path, content] of Object.entries(harnessFiles)) {
        const fullPath = join(tmpDir, path);
        await mkdir(join(tmpDir, path.split('/').slice(0, -1).join('/')), { recursive: true });
        await writeFile(fullPath, content);
      }

      // 4. Execution Logic
      let stdout = "";
      let stderr = "";
      
      if (language === "python") {
        // Assume main entry point is either main.py or defined in harness
        // harness should likely have a "run.py" or mapped entry from keys
        // For our seed, we'll ensure harness has a 'run.py' or similar mechanism
        // For simplicity, let's assume we execute "python src/tests.py" based on Typical structure
        const entryFile = Object.keys(harnessFiles).find(f => f.includes("tests") || f.includes("run")) || "main.py";
        // Convert /src/tests.py -> src/tests.py (remove leading slash if present for shell join)
        const relativeEntry = entryFile.startsWith('/') ? entryFile.slice(1) : entryFile;
        
        const cmd = `python "${join(tmpDir, relativeEntry)}"`;
        const result = await execAsync(cmd, { cwd: tmpDir, timeout: 15000 });
        stdout = result.stdout;
        stderr = result.stderr;
      } 
      else if (language === "java") {
         // Java requires compilation
         // We assume the harness and user code live in /src
         // Compile all java files in src
         await execAsync(`javac -cp . src/*.java`, { cwd: tmpDir, timeout: 15000 });
         
         // Run the runner
         // We standardise on "src.Runner" in our seeds.
         // Increasing timeout to accommodate JVM startup and execution
         const result = await execAsync(`java -cp . src.Runner`, { cwd: tmpDir, timeout: 15000 });
         stdout = result.stdout;
         stderr = result.stderr;
      } else {
        throw new Error("Unsupported server-side language");
      }

      // 5. Cleanup
      await rm(tmpDir, { recursive: true, force: true });

      // 6. Parse Output for the JSON result
      
      const lines = stdout.split('\n');
      let result = null;
      let consoleLogs = [];

      for (const line of lines) {
        // Look for string literal: __TEST_RESULT__ { ... }
        const match = line.match(/__TEST_RESULT__\s+(.*)/);
        if (match) {
            try {
                result = JSON.parse(match[1]);
            } catch (e) { console.error("Parse error", e); }
        } else {
            consoleLogs.push(line);
        }
      }

      return NextResponse.json({ 
        result: result, 
        logs: consoleLogs 
      });

    } catch (error: any) {
       // Cleanup on error
       await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
       
       return NextResponse.json({ 
         error: "Execution failed", 
         details: error.message,
         stdout: error.stdout,
         stderr: error.stderr
       }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Executor error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
