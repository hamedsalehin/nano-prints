const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = ['node_modules', '.next', '.git', 'out', 'build', 'dist', '.gemini'];
const IGNORE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.zip', '.tar', '.gz'];

function getReplacements(str, isFile = false) {
    let newStr = str;
    
    // rgb sign, rgb-sign, rgb_sign, rgbsign
    newStr = newStr.replace(/rgb[-_\s]*sign/gi, (match) => {
        if (isFile) return 'nano-signs';
        
        if (match === match.toUpperCase()) return 'NANO SIGNS';
        if (match === match.toLowerCase()) {
            if (match.includes('-')) return 'nano-signs';
            if (match.includes('_')) return 'nano_signs';
            return 'nano signs';
        }
        if (match.includes('-')) return 'nano-signs';
        if (match.includes('_')) return 'nano_signs';
        return 'Nano Signs';
    });

    // toronto
    newStr = newStr.replace(/toronto/gi, (match) => {
        if (isFile) return 'oakland-park';

        if (match === match.toUpperCase()) return 'OAKLAND PARK';
        if (match === match.toLowerCase()) {
            // Context matters, if it's a URL it might need a dash, but we don't know easily without lookaround.
            // But we already replaced file paths! Wait, if it's in a URL like /toronto, we should use oakland-park.
            // Let's just use oakland-park if we detect it's lowercase and might be a slug? 
            // It's safer to just replace with 'Oakland Park' for text, but 'oakland-park' for slugs.
            // Actually, I'll just use 'oakland park'.
            return 'oakland park';
        }
        return 'Oakland Park';
    });

    // canada / canda
    newStr = newStr.replace(/canada|canda/gi, (match) => {
        if (isFile) return 'usa';

        if (match === match.toUpperCase()) return 'USA';
        if (match === match.toLowerCase()) return 'usa';
        return 'USA';
    });

    // Fix some URL slugs we might have broken by inserting spaces
    newStr = newStr.replace(/oakland park(?=[/\-\.])/g, 'oakland-park');
    newStr = newStr.replace(/[/\-\.]oakland park/g, (m) => m[0] + 'oakland-park');
    newStr = newStr.replace(/nano signs(?=[/\-\.])/g, 'nano-signs');
    newStr = newStr.replace(/[/\-\.]nano signs/g, (m) => m[0] + 'nano-signs');

    return newStr;
}

function processDirectoryContent(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        
        if (fs.statSync(fullPath).isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                processDirectoryContent(fullPath);
            }
            continue;
        }

        const ext = path.extname(fullPath).toLowerCase();
        if (IGNORE_EXTS.includes(ext) || file === 'package-lock.json' || file === 'bun.lock' || file === 'bun.lockb' || file === 'yarn.lock' || file === 'rebrand.js' || file === 'rename_and_rebrand.js') {
            continue;
        }

        try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const newContent = getReplacements(content, false);
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated content: ${fullPath}`);
            }
        } catch (e) {
            console.error(`Error processing ${fullPath}: ${e.message}`);
        }
    }
}

function processDirectoryRenames(dir) {
    // Read dir
    let files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        
        // Skip ignored directories for traversal, but we can still rename them if needed
        if (IGNORE_DIRS.includes(file)) continue;

        const isDir = fs.statSync(fullPath).isDirectory();
        
        // Recurse first so we don't break paths
        if (isDir) {
            processDirectoryRenames(fullPath);
        }

        // Now rename
        const newFileName = getReplacements(file, true);
        if (newFileName !== file) {
            const newFullPath = path.join(dir, newFileName);
            fs.renameSync(fullPath, newFullPath);
            console.log(`Renamed: ${fullPath} -> ${newFullPath}`);
        }
    }
}

const ROOT = path.resolve(__dirname, '..');
const dirsToProcess = ['src', 'public', 'scripts'];

// First rename files
for (const d of dirsToProcess) {
    const dirPath = path.join(ROOT, d);
    if (fs.existsSync(dirPath)) {
        processDirectoryRenames(dirPath);
    }
}

// Then replace content
for (const d of dirsToProcess) {
    const dirPath = path.join(ROOT, d);
    if (fs.existsSync(dirPath)) {
        processDirectoryContent(dirPath);
    }
}

// Root files text
const rootFiles = fs.readdirSync(ROOT);
for (const file of rootFiles) {
    const fullPath = path.join(ROOT, file);
    if (fs.statSync(fullPath).isFile()) {
        const ext = path.extname(fullPath).toLowerCase();
        if (IGNORE_EXTS.includes(ext) || file === 'package-lock.json' || file === 'bun.lock' || file === 'bun.lockb' || file === 'rebrand.js' || file === 'rename_and_rebrand.js') continue;
        
        try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const newContent = getReplacements(content, false);
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated content: ${fullPath}`);
            }
        } catch (e) {
            console.error(`Error processing ${fullPath}: ${e.message}`);
        }
    }
}

console.log('Rebranding complete.');
