import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

await mkdir('dist', { recursive: true });

const html = await readFile('index.html', 'utf8');
const distHtml = html
  .replaceAll('./dist/style.css', './style.css')
  .replaceAll('./dist/main.js', './main.js')
  .replaceAll('./public/favicon.svg', './favicon.svg');

await writeFile('dist/index.html', distHtml);
await cp('public/favicon.svg', 'dist/favicon.svg');

await rm('dist/assets', { recursive: true, force: true });
await cp('assets', 'dist/assets', { recursive: true });
