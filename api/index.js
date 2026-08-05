const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

// Serve static assets with explicit MIME headers
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));

app.get('/agent.py', (req, res) => {
  res.sendFile(path.join(__dirname, '../agent.py'));
});

app.get('/labx-installer.bat', (req, res) => {
  res.sendFile(path.join(__dirname, '../labx-installer.bat'));
});

app.get('/install-agent.sh', (req, res) => {
  res.sendFile(path.join(__dirname, '../install-agent.sh'));
});

// Serve index.html for root and SPA hash routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = app;
