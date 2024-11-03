// Skip Husky install in production and CI
if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  process.exit(0);
}

const execSync = (await import("child_process")).execSync;
try {
  const currentHooksPath = execSync("git config --get core.hooksPath")
    .toString()
    .trim();

  if (currentHooksPath === ".husky/_") {
    console.log("Git hooks path is already set to .husky/_");
  } else {
    // Set the Git hooks path to `.husky/_` if it's not set correctly
    execSync("git config core.hooksPath .husky/_");
    console.log("Git hooks path set to .husky/_");
  }
} catch (error) {
  console.error("Error checking or setting git hooks path:", error);
}

const husky = (await import("husky")).default;
console.log(husky());
