const fs = require('fs');
const path = require('path');

const srcFiles = ['index.html', 'style.css', 'script.js', 'manifest.json', 'sw.js'];
const wwwDir = path.join(__dirname, 'www');

if (!fs.existsSync(wwwDir)) {
  fs.mkdirSync(wwwDir, { recursive: true });
}

// Copy files
srcFiles.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(wwwDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
});

// Copy icons directory
const srcIcons = path.join(__dirname, 'icons');
const destIcons = path.join(wwwDir, 'icons');
if (!fs.existsSync(destIcons)) {
  fs.mkdirSync(destIcons, { recursive: true });
}

if (fs.existsSync(srcIcons)) {
  fs.readdirSync(srcIcons).forEach(icon => {
    fs.copyFileSync(path.join(srcIcons, icon), path.join(destIcons, icon));
  });
}

console.log('Web assets successfully synced to www/');
