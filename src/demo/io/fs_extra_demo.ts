// npx ts-node -r tsconfig-paths/register src/demo/io/fs_extra_demo.ts

import * as fs from 'fs-extra';

async function runFsExtraDemo() {
    try {
        // Scope: Writing to a file
        {
            const filePath = './data.txt';
            const content = 'This is a demo file created using fs-extra.';
            await writeFile(filePath, content);
        }

        // Scope: Reading from a file
        {
            const filePath = './data.txt';
            const fileContent = await readFile(filePath);
            console.log('File content after writing:', fileContent);
        }

        // Scope: Copying the file to a new location
        {
            const srcPath = './data.txt';
            const destPath = './backup/data.txt';
            await copyFile(srcPath, destPath);
        }

        // Scope: Ensuring a directory exists and writing a new file there
        {
            const dirPath = './logs';
            await ensureDirectory(dirPath);

            const logFilePath = `${dirPath}/log.txt`;
            await writeFile(logFilePath, 'Log entry: Operation completed successfully.');
        }

        // Scope: Removing the copied file
        {
            const filePathToRemove = './backup/data.txt';
            await removeFile(filePathToRemove);
        }

        // Final Scope: Clean up (Removing the logs directory and the original file)
        {
            await removeFile('./data.txt');
            await removeDirectory('./logs');
        }
    } catch (error) {
        console.error('An error occurred during the fs-extra demo:', error);
    }
}

// Function to write content to a file
async function writeFile(filePath: string, content: string): Promise<void> {
    try {
        await fs.writeFile(filePath, content);
        console.log(`File written successfully: ${filePath}`);
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error);
        throw error;
    }
}

// Function to read the content of a file
async function readFile(filePath: string): Promise<string> {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        console.log(`File read successfully: ${filePath}`);
        return data;
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw error;
    }
}

// Function to copy a file from one location to another
async function copyFile(src: string, dest: string): Promise<void> {
    try {
        await fs.copy(src, dest);
        console.log(`File copied from ${src} to ${dest}`);
    } catch (error) {
        console.error(`Error copying file from ${src} to ${dest}:`, error);
        throw error;
    }
}

// Function to ensure a directory exists
async function ensureDirectory(dirPath: string): Promise<void> {
    try {
        await fs.ensureDir(dirPath);
        console.log(`Directory ensured or created: ${dirPath}`);
    } catch (error) {
        console.error(`Error ensuring directory ${dirPath}:`, error);
        throw error;
    }
}

// Function to remove a file
async function removeFile(filePath: string): Promise<void> {
    try {
        await fs.remove(filePath);
        console.log(`File removed: ${filePath}`);
    } catch (error) {
        console.error(`Error removing file ${filePath}:`, error);
        throw error;
    }
}

// Function to remove a directory
async function removeDirectory(dirPath: string): Promise<void> {
    try {
        await fs.remove(dirPath);
        console.log(`Directory removed: ${dirPath}`);
    } catch (error) {
        console.error(`Error removing directory ${dirPath}:`, error);
        throw error;
    }
}

// Run the demo
runFsExtraDemo();
