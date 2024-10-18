// npx ts-node src/apps/api_websocket/ws_api_client.ts

import WebSocket from 'ws';  // Import ws library for WebSocket client

// WebSocketClient class to manage client-side WebSocket logic
class WebSocketClient {
    private ws: WebSocket | null = null;  // WebSocket instance

    // Method to connect to the WebSocket server
    public connect(url: string): void {
        this.ws = new WebSocket(url);

        // Event handler for when the connection is opened
        this.ws.on('open', () => {
            console.log('Connected to WebSocket server');
            this.ws?.send('Hello, WebSocket server!');  // Send initial message to server
        });

        // Event handler for when a message is received
        this.ws.on('message', (message: string) => {
            console.log('Received from server:', message);
        });

        // Event handler for when the connection is closed
        this.ws.on('close', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Event handler for when an error occurs
        this.ws.on('error', (error: Error) => {
            console.error('WebSocket error:', error.message);
        });
    }

    // Method to send a message to the WebSocket server
    public sendMessage(message: string): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(message);  // Send message to the server if the connection is open
        } else {
            console.log('Cannot send message, WebSocket is not open');
        }
    }

    // Method to close the WebSocket connection
    public close(): void {
        this.ws?.close();
    }
}

function runWsApiClientDemo() {
    // Create a WebSocket client and connect to the server
    const client = new WebSocketClient();
    client.connect('ws://localhost:9001');  // Connect to WebSocket server on localhost:9001

    // Send a test message after 2 seconds
    setTimeout(() => {
        client.sendMessage('Test message from client');
    }, 2000);

    // Close the connection after 5 seconds
    setTimeout(() => {
        client.close();
    }, 5000);
}

runWsApiClientDemo();  // Run the WebSocket client demo
