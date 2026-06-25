import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\eng22\\OneDrive\\Desktop\\Resume OS\\src";

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(dirPath);
  });
}

let filesModified = 0;

walkDir(targetDir, function(filePath) {
  if (filePath.endsWith(".jsx") || filePath.endsWith(".js") || filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
    let content = fs.readFileSync(filePath, "utf-8");
    let initialContent = content;

    // Replace crimson- with primary-
    content = content.replace(/crimson-/g, "primary-");
    
    // Replace glow-crimson with glow-primary
    content = content.replace(/glow-crimson/g, "glow-primary");
    
    // Replace "crimson" with "primary" (for variant strings etc)
    content = content.replace(/"crimson"/g, '"primary"');

    if (content !== initialContent) {
      fs.writeFileSync(filePath, content, "utf-8");
      filesModified++;
      console.log("Updated: " + filePath);
    }
  }
});

console.log(`\nMigration complete. Modified ${filesModified} files.`);
