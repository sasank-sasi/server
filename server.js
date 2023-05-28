const express = require('express');
const app = express();
const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = new Set();

// WebSocket server connection handler
wss.on('connection', (ws) => {
  // Add client to the set
  clients.add(ws);
  console.log('A client connected.');

  // WebSocket message handler
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the received message to all connected clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // WebSocket close handler
  ws.on('close', () => {
    // Remove client from the set
    clients.delete(ws);
    console.log('A client disconnected.');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
