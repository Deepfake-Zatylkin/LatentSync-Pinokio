const fs = require('fs');
const path = require('path');

// Construct the file path dynamically
const filePath = path.join(__dirname, 'app', 'requirements.txt');

try {
    // Read the existing content of the file
    const content = fs.readFileSync(filePath, { encoding: 'utf8' });

    // Split the content into lines
    const lines = content.split('\n');

    // Comment out the first 5 non-empty lines
    for (let i = 0; i < 5 && i < lines.length; i++) {
        if (lines[i].trim() !== '') { // Check if line is not empty
            lines[i] = '#' + lines[i];
        }
    }

    // Join the lines back together and write to file
    const newContent = lines.join('\n');
    fs.writeFileSync(filePath, newContent, { encoding: 'utf8' });

    console.log('First 5 lines have been commented out successfully!');
} catch (error) {
    console.error('An error occurred:', error.message);
}
