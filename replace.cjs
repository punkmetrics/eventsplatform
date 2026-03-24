const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/brand-yellow/g, 'brand-purple');
content = content.replace(/Brand Yellow/g, 'Brand Purple');
content = content.replace(/#FFEA00/g, '#7b61ff');
content = content.replace(/bg-brand-purple text-brand-black/g, 'bg-brand-purple text-brand-white');
content = content.replace(/color="bg-brand-purple" hex="#7b61ff" text="text-brand-black"/g, 'color="bg-brand-purple" hex="#7b61ff" text="text-brand-white"');
fs.writeFileSync('src/App.tsx', content);
console.log('Done replacing!');
