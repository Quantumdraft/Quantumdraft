const { execSync } = require("child_process");

const isProduction = process.env.NODE_ENV === "production";

try {
  if (isProduction) {
    console.log("Production environment detected (NODE_ENV=production).");
    console.log("Running 'vite preview' to serve the optimized production build...");
    execSync("npx vite preview", { stdio: "inherit" });
  } else {
    console.log("Development environment detected.");
    console.log("Running 'vite' development server...");
    execSync("npx vite", { stdio: "inherit" });
  }
} catch (error) {
  console.error("Error starting server:", error);
  process.exit(1);
}
