const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, 'dist')));

// Send index.html for the root route
app.get('*', (req, res) => {
  console.log('Serving dist/index.html');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`
🚀 AI Medulla is running!
🔗 Local: http://localhost:${PORT}
📂 Sharing: You can now deploy this folder to Render/Vercel.
  `);
});
