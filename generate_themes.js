const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, 'themes');
if (!fs.existsSync(themesDir)) fs.mkdirSync(themesDir);

const themes = [
  { name: 'dracula', bg: '#282a36', text: '#f8f8f2', blobs: ['#ff79c6', '#bd93f9', '#50fa7b'] },
  { name: 'tokyo-night', bg: '#1a1b2e', text: '#c0caf5', blobs: ['#7aa2f7', '#bb9af7', '#9ece6a'] },
  { name: 'catppuccin', bg: '#1e1e2e', text: '#cdd6f4', blobs: ['#cba6f7', '#f38ba8', '#a6e3a1'] },
  { name: 'nord', bg: '#2e3440', text: '#eceff4', blobs: ['#81a1c1', '#88c0d0', '#a3be8c'] },
  { name: 'gruvbox', bg: '#282828', text: '#ebdbb2', blobs: ['#d79921', '#fe8019', '#b8bb26'] },
  { name: 'solarized-dark', bg: '#002b36', text: '#839496', blobs: ['#2aa198', '#268bd2', '#859900'] },
  { name: 'solarized-light', bg: '#fdf6e3', text: '#657b83', blobs: ['#2aa198', '#cb4b16', '#b58900'], glassBg: 'rgba(0,0,0,0.03)', glassBorder: 'rgba(0,0,0,0.08)', glassHover: 'rgba(0,0,0,0.06)' },
  { name: 'cyberpunk', bg: '#120458', text: '#00f0ff', blobs: ['#ff007f', '#00f0ff', '#ff00ff'] },
  { name: 'synthwave', bg: '#241b2f', text: '#f92aad', blobs: ['#ff2a6d', '#05d9e8', '#d1f7ff'] },
  { name: 'rose-pine', bg: '#191724', text: '#e0def4', blobs: ['#ebbcba', '#31748f', '#c4a7e7'] },
  { name: 'monokai', bg: '#272822', text: '#f8f8f2', blobs: ['#f92672', '#a6e22e', '#66d9ef'] },
  { name: 'one-dark', bg: '#282c34', text: '#abb2bf', blobs: ['#61afef', '#c678dd', '#98c379'] },
  { name: 'material-ocean', bg: '#0f111a', text: '#8f93a2', blobs: ['#82aaff', '#c792ea', '#c3e88d'] },
  { name: 'dracula-light', bg: '#f8f8f2', text: '#282a36', blobs: ['#ff79c6', '#bd93f9', '#50fa7b'], glassBg: 'rgba(0,0,0,0.05)', glassBorder: 'rgba(0,0,0,0.1)', glassHover: 'rgba(0,0,0,0.08)' },
  { name: 'hacker-terminal', bg: '#000000', text: '#00ff00', blobs: ['#00ff00', '#008800', '#003300'] }
];

themes.forEach(t => {
  const content = ":root {\n" +
  "  --bg-color: " + t.bg + ";\n" +
  "  --text-primary: " + t.text + ";\n" +
  "  --text-secondary: " + t.text + "b3;\n" +
  "  --glass-bg: " + (t.glassBg || 'rgba(255, 255, 255, 0.05)') + ";\n" +
  "  --glass-border: " + (t.glassBorder || 'rgba(255, 255, 255, 0.1)') + ";\n" +
  "  --glass-hover: " + (t.glassHover || 'rgba(255, 255, 255, 0.12)') + ";\n" +
  "  --blob-1: " + t.blobs[0] + ";\n" +
  "  --blob-2: " + t.blobs[1] + ";\n" +
  "  --blob-3: " + t.blobs[2] + ";\n" +
  "}\n";
  fs.writeFileSync(path.join(themesDir, t.name + '.css'), content);
});
console.log('Themes generated successfully!');
