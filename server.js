/**
 * LabX Startup Production Backend API & WebSocket Server
 * Handles multi-tenant telemetry ingestion, API security, and real-time dashboard pushing
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory state store (Backed by Redis / MongoDB in full production)
const connectedAgents = new Map();

// Middleware: API Key Authentication for Agents
const authenticateAgent = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.LABX_API_KEY && apiKey !== 'labx-secret-key-2025') {
    return res.status(401).json({ error: 'Unauthorized: Invalid Agent API Key' });
  }
  next();
};

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', activeAgents: connectedAgents.size, timestamp: new Date() });
});

// Telemetry Ingestion Endpoint (POST /api/v1/telemetry)
app.post('/api/v1/telemetry', authenticateAgent, (req, res) => {
  const payload = req.body;
  
  if (!payload.mac || !payload.hostname) {
    return res.status(400).json({ error: 'Bad Request: Missing mac or hostname' });
  }

  payload.lastSeen = new Date();
  connectedAgents.set(payload.mac, payload);

  // Broadcast live metric to connected Admin Dashboard web clients via WebSocket
  io.emit('telemetry:update', payload);

  res.status(200).json({ status: 'acknowledged', mac: payload.mac });
});

// Admin API: Fetch all computers
app.get('/api/v1/computers', (req, res) => {
  res.json(Array.from(connectedAgents.values()));
});

// WebSocket connection for real-time dashboard updates
io.on('connection', (socket) => {
  console.log(`[Dashboard Client Connected] Socket ID: ${socket.id}`);
  socket.emit('initial:state', Array.from(connectedAgents.values()));
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` 🚀 LabX Startup Production API Server running on port ${PORT}`);
  console.log(` Telemetry Endpoint: POST http://localhost:${PORT}/api/v1/telemetry`);
  console.log(`====================================================`);
});
