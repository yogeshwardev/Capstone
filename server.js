/**
 * LabX Startup Production Backend API & Static File Server
 * Serves static dashboard frontend and accepts agent telemetry payloads
 */

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Serve static frontend files (index.html, css, js)
app.use(express.static(path.join(__dirname)));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Telemetry Ingestion Endpoint
app.post('/api/v1/telemetry', (req, res) => {
  res.status(200).json({ status: 'acknowledged' });
});

// Fallback route: Serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(PORT, () => {
  console.log(`🚀 LabX Server running on port ${PORT}`);
});
