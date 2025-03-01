const fs = require('fs');
const path = require('path');

const typesDir = path.join(__dirname, 'types');
const indexFile = path.join(typesDir, 'index.d.ts');

fs.readdir(typesDir, (err, files) => {
  if (err) throw err;

  const exports = files
    .filter(file => file.endsWith('.d.ts') && file !== 'index.d.ts')
    .map(file => `export * from './${file.replace('.d.ts', '')}';`)
    .join('\n');

  fs.writeFile(indexFile, exports, err => {
    if (err) throw err;
    console.log('index.d.ts has been generated.');
  });
}); 