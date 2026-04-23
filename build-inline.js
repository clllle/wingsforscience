#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'style.css');
const htmlPath = path.join(__dirname, 'index.html');

const css = fs.readFileSync(cssPath, 'utf8');

const minified = css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

const html = fs.readFileSync(htmlPath, 'utf8');
const newHtml = html.replace(/<style>[\s\S]*?<\/style>/, `<style>${minified}</style>`);

if (html === newHtml) {
  console.error('Erreur : aucun <style>...</style> trouvé dans index.html');
  process.exit(1);
}

fs.writeFileSync(htmlPath, newHtml);

const origKB = (css.length / 1024).toFixed(1);
const minKB = (minified.length / 1024).toFixed(1);
console.log(`✓ style.css (${origKB} KB) → inline minifié (${minKB} KB) dans index.html`);
