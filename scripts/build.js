/* Minimal static build: copies brand and site to dist, maps PT to root and EN to /en */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

function rimrafSync(target){
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

function ensureDir(p){ fs.mkdirSync(p, { recursive: true }); }

function copyDir(src, dest){
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })){
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function main(){
  rimrafSync(DIST);
  ensureDir(DIST);

  // Copy brand assets as-is under /brand for sharing icons, tokens
  copyDir(path.join(ROOT, 'brand'), path.join(DIST, 'brand'));

  // Copy site shared/assets
  copyDir(path.join(ROOT, 'site', 'assets'), path.join(DIST, 'site', 'assets'));
  copyDir(path.join(ROOT, 'site', 'shared'), path.join(DIST, 'site', 'shared'));

  // Map PT (default) to root
  copyDir(path.join(ROOT, 'site', 'pt'), DIST);
  // Make index.html available at root
  if (fs.existsSync(path.join(DIST, 'index.html')) === false && fs.existsSync(path.join(ROOT, 'site', 'pt', 'index.html'))){
    fs.copyFileSync(path.join(ROOT, 'site', 'pt', 'index.html'), path.join(DIST, 'index.html'));
  }

  // Map EN under /en
  copyDir(path.join(ROOT, 'site', 'en'), path.join(DIST, 'en'));

  // Root files
  for (const f of ['robots.txt', 'sitemap.xml']){
    if (fs.existsSync(path.join(ROOT, f))) fs.copyFileSync(path.join(ROOT, f), path.join(DIST, f));
  }

  console.log('Build complete -> dist');
}

main();


