const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
    { name: 'circuite', sizes: [400, 800, 1200] },
    { name: 'ninge', sizes: [400, 800] },
    { name: 'legaturi', sizes: [400, 800] },
    { name: 'dor', sizes: [400, 800] }
];

async function optimizeImages() {
    for (const image of images) {
        const inputPath = path.join(__dirname, 'images', `${image.name}.webp`);
        
        for (const size of image.sizes) {
            const outputPath = path.join(__dirname, 'images', `${image.name}-${size}.webp`);
            
            await sharp(inputPath)
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .webp({ quality: 80 })
                .toFile(outputPath);
                
            console.log(`Generated ${outputPath}`);
        }
    }
}

optimizeImages().catch(console.error); 