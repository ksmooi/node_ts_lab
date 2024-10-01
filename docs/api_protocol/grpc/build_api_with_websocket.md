# Designing a gRPC API Server and Client with TypeScript

In this guide, we will walk through the process of designing gRPC API server and client components for a product-related API using TypeScript on Node.js. We will use `uWebSockets.js` (`uws`) for the server and `ws` for the client. The implementation will follow object-oriented principles, and we will generate necessary Protobuf files to support gRPC communication.

By default, **when using protobufjs (pbjs and pbts) as we've done, the service definitions in your .proto file are not generated into JavaScript or TypeScript code.** Only the message types (i.e., message definitions) are generated.

In our setup, we've manually implemented the service logic in our server and client code based on the service definitions in the .proto file.

However, if you want to generate service stubs from your service definitions, you can use additional tools or options with protobufjs to include them in the generated code.

## Source Tree Structure

The code organization for this project is as follows:

```
src/apps/api_grpc_websocket
├── generated
│   ├── product_pb.d.ts
│   └── product_pb.js
├── grpc_api_client.ts
├── grpc_api_server.ts
└── product.proto
```

### Step 1: Define the Protocol Buffer File (`product.proto`)

First, we define our `.proto` file, which specifies the structure of the gRPC service and the messages that will be exchanged between the client and server.

**`src/apps/api_grpc_websocket/product.proto`:**

```protobuf
syntax = "proto3";

package productapi;

message Product {
  int32 id = 1;
  string name = 2;
  string description = 3;
  float price = 4;
}

message GetProductRequest {
  int32 id = 1;
}

message GetProductResponse {
  Product product = 1;
}

message ListProductsRequest {}

message ListProductsResponse {
  repeated Product products = 1;
}

message CreateProductRequest {
  Product product = 1;
}

message CreateProductResponse {
  Product product = 1;
}

message UpdateProductRequest {
  Product product = 1;
}

message UpdateProductResponse {
  Product product = 1;
}

message DeleteProductRequest {
  int32 id = 1;
}

message DeleteProductResponse {
  bool success = 1;
}

service ProductService {
  rpc GetProduct (GetProductRequest) returns (GetProductResponse);
  rpc ListProducts (ListProductsRequest) returns (ListProductsResponse);
  rpc CreateProduct (CreateProductRequest) returns (CreateProductResponse);
  rpc UpdateProduct (UpdateProductRequest) returns (UpdateProductResponse);
  rpc DeleteProduct (DeleteProductRequest) returns (DeleteProductResponse);
}
```

### Step 2: Generate Protobuf Source Files

We need to generate the JavaScript and TypeScript files from the `.proto` file.

1. Install the necessary tools:

   ```bash
   npm install protobufjs
   npm install -g protobufjs-cli
   ```

2. Run the following commands to generate the static JavaScript module and TypeScript definitions:

   ```bash
   pbjs -t static-module -w commonjs -o ./src/apps/api_grpc_websocket/generated/product_pb.js ./src/apps/api_grpc_websocket/product.proto
   pbts -o ./src/apps/api_grpc_websocket/generated/product_pb.d.ts ./src/apps/api_grpc_websocket/generated/product_pb.js
   ```

### Step 3: Implement the gRPC Server (`grpc_api_server.ts`)

Now, we will implement the gRPC server using `uWebSockets.js` to handle WebSocket connections and the generated Protobuf definitions for communication.

**Install Dependencies:**

```bash
npm install uWebSockets.js
npm install @types/node
```

**`src/apps/api_grpc_websocket/grpc_api_server.ts`:**

```typescript
// npx ts-node src/apps/api_grpc_websocket/grpc_api_server.ts

import { App } from 'uWebSockets.js';
import * as productProto from './generated/product_pb';

/**
 * Class representing the Product service implementation.
 */
class MyProductServiceServer {
  // In-memory data store for products
  private products: { [key: number]: productProto.productapi.IProduct } = {};
  private nextProductId: number = 1;

  // Fetches a product by ID
  public async getProduct(request: productProto.productapi.IGetProductRequest): Promise<productProto.productapi.IProduct> {
    const product = this.products[request.id];
    if (!product) {
      throw new Error(`Product with ID ${request.id} not found.`);
    }
    return product;
  }

  // Creates a new product
  public async createProduct(request: productProto.productapi.ICreateProductRequest): Promise<productProto.productapi.IProduct> {
    const product = request.product;
    product.id = this.nextProductId++;
    this.products[product.id] = product;
    return product;
  }

  // Updates an existing product
  public async updateProduct(request: productProto.productapi.IUpdateProductRequest): Promise<productProto.productapi.IProduct> {
    const product = request.product;
    if (!this.products[product.id]) {
      throw new Error(`Product with ID ${product.id} not found.`);
    }
    this.products[product.id] = product;
    return product;
  }

  // Deletes a product by ID
  public async deleteProduct(request: productProto.productapi.IDeleteProductRequest): Promise<productProto.productapi.IEmpty> {
    if (!this.products[request.id]) {
      throw new Error(`Product with ID ${request.id} not found.`);
    }
    delete this.products[request.id];
    return {};
  }

  // Lists all products
  public async listProducts(request: productProto.productapi.IEmpty): Promise<productProto.productapi.IListProductsResponse> {
    return { products: Object.values(this.products) };
  }
}

// Set up the WebSocket route and application server
const app = App();
const service = new MyProductServiceServer();

app.ws('/*', {
  open: () => console.log('WebSocket connection established'),
  message: async (ws, message) => {
    try {
      const buffer = Buffer.from(message);
      const envelope = productProto.productapi.Envelope.decode(buffer);

      let responseBuffer: Uint8Array;
      switch (envelope.method) {
        case 'GetProduct':
          const getProductRequest = productProto.productapi.GetProductRequest.decode(envelope.payload);
          const getProductResponse = await service.getProduct(getProductRequest);
          responseBuffer = productProto.productapi.Envelope.encode({
            method: 'GetProduct',
            payload: productProto.productapi.Product.encode(getProductResponse).finish()
          }).finish();
          break;
        // Handle other cases...
      }

      ws.send(responseBuffer);
    } catch (err) {
      console.error('Error handling message:', err);
    }
  },
  close: () => console.log('WebSocket connection closed')
});

app.listen(9001, token => {
  if (token) {
    console.log('Server is listening on port 9001');
  } else {
    console.log('Failed to start server on port 9001');
  }
});
```

### Step 4: Implement the gRPC Client (`grpc_api_client.ts`)

For the client, we will use the `ws` library to establish a WebSocket connection and send/receive messages using the Protobuf definitions.

**Install Dependencies:**

```bash
npm install ws
npm install --save-dev @types/ws
```

**`src/apps/api_grpc_websocket/grpc_api_client.ts`:**

```typescript
// npx ts-node src/apps/api_grpc_websocket/grpc_api_client.ts

import WebSocket from 'ws';
import * as productProto from './generated/product_pb';

/**
 * Class representing the gRPC client.
 */
class MyProductServiceClient {
  private ws: WebSocket;

  constructor(url: string) {
    this.ws = new WebSocket(url);

    this.ws.on('message', (data: WebSocket.Data) => {
      const envelope = productProto.productapi.Envelope.decode(Buffer.from(data as any));
      console.log(`Received response for method: ${envelope.method}`);
    });

    this.ws.on('close', () => console.log('WebSocket connection closed'));
  }

  public onOpen(callback: () => void) {
    this.ws.on('open', callback);
  }

  public sendRequest(method: string, payload: Uint8Array) {
    const envelope = productProto.productapi.Envelope.create({ method, payload });
    const buffer = productProto.productapi.Envelope.encode(envelope).finish();
    this.ws.send(buffer);
  }

  public getProduct(id: number) {
    const request = productProto.productapi.GetProductRequest.create({ id });
    this.sendRequest('GetProduct', productProto.productapi.GetProductRequest.encode(request).finish());
  }
}

// Create a client and perform some operations
const client = new MyProductServiceClient('ws://localhost:9001');
client.onOpen(() => {
  client.getProduct(1);
});
```

### Final Steps

1. **Install All Dependencies:**

   ```bash
   npm install
   npm install uWebSockets.js ws protobufjs @types/ws @types/node
   ```

2. **Generate Protobuf Files:**

   ```bash
   pbjs -t static-module -w commonjs -o ./src/apps/api_grpc_websocket/generated/product_pb.js ./src/apps/api_grpc_websocket/product.proto
   pbts -o ./src/apps/api_grpc_websocket/generated/product_pb.d.ts ./src/apps/api_grpc_websocket/generated/product_pb.js
   ```

3. **Run the Server:**

   ```bash
   npx ts-node src/apps/api_grpc_websocket/grpc_api_server.ts
   ```

4. **Run the Client:**

   ```bash
   npx ts-node src/apps/api_grpc_websocket/grpc_api_client.ts
   ```

### Conclusion

In this article, we have successfully implemented a gRPC API using TypeScript with `uWebSockets.js` on the server-side and `ws` on the client-side. The communication is established via WebSockets, and we handle gRPC-like messaging using Protobuf for serialization and deserialization. This structure allows us to create scalable and efficient APIs using WebSockets with type safety and ease of communication.

