import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

await mkdir('dist', { recursive: true });

const fileHash = async (filePath) => {
  const file = await readFile(filePath);
  return createHash('sha256').update(file).digest('hex').slice(0, 8);
};

const styleHash = await fileHash('dist/style.css');
const mainHash = await fileHash('dist/main.js');

const html = await readFile('index.html', 'utf8');
const distHtml = html
  .replaceAll('./dist/style.css', `./style.css?v=${styleHash}`)
  .replaceAll('./dist/main.js', `./main.js?v=${mainHash}`)
  .replaceAll('./public/favicon.svg', './favicon.svg');

await writeFile('dist/index.html', distHtml);
await cp('public/favicon.svg', 'dist/favicon.svg');

await rm('dist/assets', { recursive: true, force: true });
await cp('assets', 'dist/assets', { recursive: true });
