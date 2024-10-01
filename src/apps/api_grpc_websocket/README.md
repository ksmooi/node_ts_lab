# gRPC API Project with `uWebSockets.js`, `ws`, and Protocol Buffers

This project demonstrates how to build and run a gRPC-like API using `uWebSockets.js` for the server, `ws` for the client, and Protocol Buffers (`protobuf`) for efficient data serialization. The API is designed around a product management system with CRUD operations, where communication between the client and server is done over WebSockets using protobuf serialization.

By default, **when using protobufjs (pbjs and pbts) as we've done, the service definitions in your .proto file are not generated into JavaScript or TypeScript code.** Only the message types (i.e., message definitions) are generated.

In our setup, we've manually implemented the service logic in our server and client code based on the service definitions in the .proto file.

However, if you want to generate service stubs from your service definitions, you can use additional tools or options with protobufjs to include them in the generated code.

## Prerequisites

Before building and running the project, ensure you have the following installed:

- **Node.js**: Version 16.x or later
- **npm**: Version 8.x or later
- **protobufjs**: For generating Protobuf classes
- **uWebSockets.js**: For WebSocket server
- **ws**: For WebSocket client
- **TypeScript**: For compiling TypeScript files

## Installation

Clone this repository and navigate to the project directory:

```bash
git clone <repository_url>
cd node_ts_lab
```

### Install Dependencies

Install the required dependencies for the project:

```bash
npm install
```

## Project Structure

```
src/apps/api_grpc_websocket/
├── generated/
│   ├── product_pb.d.ts           # TypeScript definitions for protobuf
│   └── product_pb.js             # Generated protobuf JavaScript code
├── grpc_api_client.ts            # WebSocket client using `ws`
├── grpc_api_server.ts            # WebSocket server using `uWebSockets.js`
└── product.proto                 # Protobuf schema for the API
```

## Step 1: Generate Protobuf Code

To generate the Protobuf JavaScript code and TypeScript definitions from the `product.proto` file, run the following commands:

1. Install `protobufjs` and its CLI:

```bash
npm install protobufjs
npm install -g protobufjs-cli
```

2. Generate the Protobuf files:

```bash
pbjs -t static-module -w commonjs -o ./src/apps/api_grpc_websocket/generated/product_pb.js ./src/apps/api_grpc_websocket/product.proto
pbts -o ./src/apps/api_grpc_websocket/generated/product_pb.d.ts ./src/apps/api_grpc_websocket/generated/product_pb.js
```

This will generate `product_pb.js` and `product_pb.d.ts` in the `generated` directory.

## Step 2: Build TypeScript Files

The project is written in TypeScript, and you may choose to build the TypeScript files before running them. To compile the TypeScript files to JavaScript, use the following command:

```bash
npx tsc
```

Alternatively, you can run the project directly using `ts-node` (without the need for building):

```bash
npx ts-node src/apps/api_grpc_websocket/grpc_api_server.ts
npx ts-node src/apps/api_grpc_websocket/grpc_api_client.ts
```

## Step 3: Running the Server

The server is built using `uWebSockets.js` and handles WebSocket connections using protobuf-encoded messages.

To start the server, run:

```bash
npx ts-node src/apps/api_grpc_websocket/grpc_api_server.ts
```

You should see output like:

```
Server is listening on port 9001
```

This means the WebSocket server is running and ready to accept connections.

## Step 4: Running the Client

The client uses `ws` to establish a WebSocket connection to the server and perform gRPC-like operations such as creating, updating, fetching, and deleting products.

To run the client, use:

```bash
npx ts-node src/apps/api_grpc_websocket/grpc_api_client.ts
```

You should see various outputs as the client interacts with the server. For example:

```
Received CreateProduct response: Product { id: 1, name: 'Product A', description: 'Description of Product A', price: 99.99 }
Listing all products after creation: ...
```

The client will perform the following operations in sequence:

1. Create a new product.
2. List all products.
3. Fetch a product by ID.
4. Update the product.
5. Delete the product.
6. List all products again to confirm deletion.

## Summary of Commands

- **Generate Protobuf Files**:

  ```bash
  pbjs -t static-module -w commonjs -o ./src/apps/api_grpc_websocket/generated/product_pb.js ./src/apps/api_grpc_websocket/product.proto
  pbts -o ./src/apps/api_grpc_websocket/generated/product_pb.d.ts ./src/apps/api_grpc_websocket/generated/product_pb.js
  ```

- **Run the Server**:

  ```bash
  npx ts-node src/apps/api_grpc_websocket/grpc_api_server.ts
  ```

- **Run the Client**:

  ```bash
  npx ts-node src/apps/api_grpc_websocket/grpc_api_client.ts
  ```

## Conclusion

This project demonstrates how to use `uWebSockets.js` for building a high-performance WebSocket server and `ws` for the client, while employing Protocol Buffers for efficient data exchange in a gRPC-like system. You can easily extend the functionality to suit more complex use cases, including real-time data streaming or further CRUD operations.

