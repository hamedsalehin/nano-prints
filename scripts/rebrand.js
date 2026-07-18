const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = ['node_modules', '.next', '.git', 'out', 'build', 'dist', '.gemini'];
const IGNORE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.zip', '.tar', '.gz'];

// Replaces text with preserving basic casing
function replaceText(content) {
    let newContent = content;

    // Nano Signs -> Nano Signs
    newContent = newContent.replace(/rgb\s*sign/gi, (match) => {
        if (match === match.toUpperCase()) return 'NANO SIGNS';
        if (match === match.toLowerCase()) return 'nano signs';
        if (match.startsWith('RGB')) return 'Nano Signs';
        return 'Nano Signs'; // Default
    });

    // Oakland Park -> Oakland Park
    newContent = newContent.replace(/oakland park/gi, (match) => {
        if (match === match.toUpperCase()) return 'OAKLAND PARK';
        if (match === match.toLowerCase()) return 'oakland park';
        return 'Oakland Park';
    });

    // USA/USA -> USA
    newContent = newContent.replace(/usa|usa/gi, (match) => {
        if (match === match.toUpperCase()) return 'USA';
        if (match === match.toLowerCase()) return 'usa';
        return 'USA';
    });

    return newContent;
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        
        // Skip ignored directories
        if (fs.statSync(fullPath).isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                processDirectory(fullPath);
            }
            continue;
        }

        // Process file
        const ext = path.extname(fullPath).toLowerCase();
        
        // Only process text files (skip known binaries, package-lock.json, bun.lock)
        if (IGNORE_EXTS.includes(ext) || file === 'package-lock.json' || file === 'bun.lock' || file === 'bun.lockb' || file === 'yarn.lock') {
            continue;
        }

        try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const newContent = replaceText(content);
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated content: ${fullPath}`);
            }
        } catch (e) {
            console.error(`Error processing ${fullPath}: ${e.message}`);
        }
    }
}

// Start processing from root (or specific dirs)
const ROOT = path.resolve(__dirname, '..');
const dirsToProcess = ['src', 'public', 'scripts']; // Just to be safe, avoid touching root config if not needed, but we can do root too.

for (const d of dirsToProcess) {
    const dirPath = path.join(ROOT, d);
    if (fs.existsSync(dirPath)) {
        console.log(`Processing directory: ${dirPath}`);
        processDirectory(dirPath);
    }
}

// Also process root level files except ignores
const rootFiles = fs.readdirSync(ROOT);
for (const file of rootFiles) {
    const fullPath = path.join(ROOT, file);
    if (fs.statSync(fullPath).isFile()) {
        const ext = path.extname(fullPath).toLowerCase();
        if (IGNORE_EXTS.includes(ext) || file === 'package-lock.json' || file === 'bun.lock' || file === 'bun.lockb') continue;
        
        try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const newContent = replaceText(content);
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
