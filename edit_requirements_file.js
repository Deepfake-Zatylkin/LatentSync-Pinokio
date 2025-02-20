const fs = require('fs');
const path = require('path');

// Path to the requirements.txt file in the app subdirectory
const filePath = path.join(__dirname, 'app', 'requirements.txt');

try {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Split content into lines
    const lines = fileContent.split('\n');
    
    // Comment out first 5 lines by adding # at the beginning
    for (let i = 0; i < Math.min(5, lines.length); i++) {
        lines[i] = '# ' + lines[i];
    }
    
    // Join the lines back together
    const modifiedContent = lines.join('\n');
    
    // Write the modified content back to the file
    fs.writeFileSync(filePath, modifiedContent);
    
    console.log('Successfully commented out first 5 lines');
} catch (error) {
    console.error('Error processing file:', error);
}