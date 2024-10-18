// npx ts-node src/apps/api_websocket/ws_api_server.ts

import uWS from 'uWebSockets.js';  // Import uWebSockets.js library

// WebSocketServer class to manage WebSocket server logic
class WebSocketServer {
    private port: number;    // The port on which the server will run
    private wsApp: uWS.TemplatedApp; // uWS server instance

    constructor(port: number) {
        this.port = port;
        this.wsApp = uWS.App(); // Create a new uWS server instance
    }

    // Method to start the WebSocket server
    public start(): void {
        this.wsApp.ws('/*', {
            // Event handler for new WebSocket connections
            open: (ws) => {
                console.log('Client connected');
                ws.send('Welcome to the WebSocket server!');
            },

            // Event handler for incoming messages
            message: (ws, message) => {
                const receivedMessage = Buffer.from(message).toString();
                console.log('Received message:', receivedMessage);

                // Echo the received message back to the client
                ws.send(`Echo: ${receivedMessage}`);
            },

            // Event handler for connection closure
            close: (ws, code, message) => {
                console.log('Client disconnected');
            }
        });

        // Listen on the specified port
        this.wsApp.listen(this.port, (token) => {
            if (token) {
                console.log(`WebSocket server is running on ws://localhost:${this.port}`);
            } else {
                console.log(`Failed to start WebSocket server on port ${this.port}`);
            }
        });
    }
}

function runWsApiServerDemo() {
    // Create and start a WebSocket server on port 9001
    const server = new WebSocketServer(9001);
    server.start();
}

runWsApiServerDemo();  // Run the WebSocket server demo
