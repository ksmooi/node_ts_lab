# Building a gRPC Server and Client in TypeScript with `ts-proto`

This article will guide you through the process of setting up a gRPC API server and client using TypeScript and `ts-proto`. We'll use Protocol Buffers (protobuf) for defining the API and the message structure, ensuring strong typing and efficient data serialization. `ts-proto` generates TypeScript-compatible code for both gRPC service definitions and message types, which makes integrating gRPC with TypeScript seamless.

### Overview of Steps

1. Generate TypeScript code from `.proto` files using `protoc` and `ts-proto`.
2. Implement a gRPC API server.
3. Implement a gRPC API client.
4. Run and test the server and client.

### Benefits of Using `ts-proto` with gRPC

- **Strong Typing:** `ts-proto` generates TypeScript types for your protobuf messages and services, ensuring type safety in both the server and client.
- **Efficient Data Serialization:** Protobuf minimizes the size of transmitted data compared to JSON or XML, making communication faster and more efficient.
- **gRPC Support:** gRPC provides native support for streaming, bi-directional communication, and load balancing, making it a great choice for scalable systems.


## Step 1: Define the `.proto` File

We first need to define our gRPC API using a `.proto` file. This file defines the data structures (messages) and RPC (Remote Procedure Call) services for the Product API.

### Defining the `product.proto` File

Create a file at `src/apps/api_grpc_tsproto/product.proto`:

```proto
syntax = "proto3";

package mypackage;

// Define messages
message Empty {}

message Product {
  int32 id = 1;
  string name = 2;
  string description = 3;
  double price = 4;
}

// Requests and responses
message GetProductRequest { int32 id = 1; }
message CreateProductRequest { Product product = 1; }
message UpdateProductRequest { Product product = 1; }
message DeleteProductRequest { int32 id = 1; }
message ListProductsResponse { repeated Product products = 1; }

// Define the ProductService
service ProductService {
  rpc GetProduct(GetProductRequest) returns (Product);
  rpc CreateProduct(CreateProductRequest) returns (Product);
  rpc UpdateProduct(UpdateProductRequest) returns (Product);
  rpc DeleteProduct(DeleteProductRequest) returns (Empty);
  rpc ListProducts(Empty) returns (ListProductsResponse);
}
```

This `.proto` file describes the structure of the messages and the gRPC service that handles product-related operations.


## Step 2: Generate `product.ts` Using `protoc` and `ts-proto`

To generate TypeScript code from the `.proto` file, we need to use `protoc` along with the `ts-proto` plugin.

### Install Required Tools

First, install `ts-proto`:

```bash
npm install --save-dev ts-proto
```

### Generating the TypeScript Code

Run the `protoc` command to generate TypeScript from the `product.proto` file:

```bash
protoc --plugin=protoc-gen-ts_proto=node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=src/apps/api_grpc_tsproto/generated \
  --ts_proto_opt=outputServices=grpc-js,useOptionals=messages,esModuleInterop=true \
  -I src/apps/api_grpc_tsproto src/apps/api_grpc_tsproto/product.proto
```

- `--plugin=protoc-gen-ts_proto`: Specifies the path to the `ts-proto` plugin.
- `--ts_proto_out`: The output directory for the generated TypeScript files.
- `--ts_proto_opt=outputServices=grpc-js`: Generates service definitions that are compatible with `grpc-js`.
- `--ts_proto_opt=useOptionals=messages`: Enables optional fields in protobuf messages.
- `-I`: Specifies the include path for `.proto` files.

After running this command, the `generated/product.ts` file will contain TypeScript definitions for both the messages and services.

---

## Step 3: Implement the gRPC API Server

Next, we’ll implement the gRPC server using the generated `product.ts` file and the `grpc-js` library.

### Install Server Dependencies

```bash
npm install @grpc/grpc-js
npm install --save-dev @types/node
```

### Server Implementation

In `src/apps/api_grpc_tsproto/grpc_api_server.ts`, define the server logic:

```typescript
import { Server, ServerCredentials, status } from '@grpc/grpc-js';
import {
  ProductServiceService,
  ProductServiceServer,
  Empty,
  Product,
  GetProductRequest,
  CreateProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
  ListProductsResponse,
} from './generated/product';

// In-memory product store
const products: { [id: number]: Product } = {};
let nextProductId = 1;

// Define the ProductService implementation
const productService: ProductServiceServer = {
  // Retrieve a product by ID
  getProduct: (call, callback) => {
    const request = call.request;
    const product = products[request.id];
    if (product) {
      callback(null, product);
    } else {
      callback({
        code: status.NOT_FOUND,
        message: `Product with ID ${request.id} not found.`,
      });
    }
  },

  // Create a new product
  createProduct: (call, callback) => {
    const product = call.request.product;
    product.id = nextProductId++;
    products[product.id] = product;
    callback(null, product);
  },

  // Update a product
  updateProduct: (call, callback) => {
    const product = call.request.product;
    if (products[product.id]) {
      products[product.id] = product;
      callback(null, product);
    } else {
      callback({
        code: status.NOT_FOUND,
        message: `Product with ID ${product.id} not found.`,
      });
    }
  },

  // Delete a product
  deleteProduct: (call, callback) => {
    const id = call.request.id;
    if (products[id]) {
      delete products[id];
      callback(null, Empty.create());
    } else {
      callback({
        code: status.NOT_FOUND,
        message: `Product with ID ${id} not found.`,
      });
    }
  },

  // List all products
  listProducts: (call, callback) => {
    callback(null, ListProductsResponse.create({ products: Object.values(products) }));
  },
};

// Initialize and start the server
function main() {
  const server = new Server();
  server.addService(ProductServiceService, productService);
  server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server running on port ${port}`);
    server.start();
  });
}

main();
```

## Step 4: Implement the gRPC API Client

The client will use the `grpc-js` library to interact with the gRPC server.

### Install Client Dependencies

```bash
npm install @grpc/grpc-js
npm install --save-dev @types/node
```

### Client Implementation

In `src/apps/api_grpc_tsproto/grpc_api_client.ts`, define the client logic:

```typescript
import { credentials } from '@grpc/grpc-js';
import {
  ProductServiceClient,
  Empty,
  GetProductRequest,
  CreateProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
} from './generated/product';

// Create a new ProductServiceClient instance
const client = new ProductServiceClient('localhost:50051', credentials.createInsecure());

// Example operations: Create, Retrieve, Update, Delete
async function runClient() {
  // Create a new product
  const createReq: CreateProductRequest = {
    product: {
      name: 'Test Product',
      description: 'A sample product',
      price: 100.0,
    },
  };
  client.createProduct(createReq, (err, res) => {
    if (err) throw err;
    console.log('Product Created:', res);

    // Get the created product
    const getReq: GetProductRequest = { id: res.id };
    client.getProduct(getReq, (err, res) => {
      if (err) throw err;
      console.log('Product Retrieved:', res);

      // Update the product
      const updateReq: UpdateProductRequest = {
        product: { ...res, name: 'Updated Product', price: 120.0 },
      };
      client.updateProduct(updateReq, (err, res) => {
        if (err) throw err;
        console.log('Product Updated:', res);

        // Delete the product
        const deleteReq: DeleteProductRequest = { id: res.id };
        client.deleteProduct(deleteReq, (err, res) => {
          if (err) throw err;
          console.log('Product Deleted:', res);

          // List all products
          client.listProducts(Empty.create(), (err, res) => {
            if (err) throw err;
            console.log('Product List:', res.products);
          });
        });
      });
    });
  });
}

runClient();
```

## Step 5: Build and Run the Project

### Compile TypeScript Files

First, compile the TypeScript files into JavaScript:

```bash
npx tsc
```

### Start the gRPC Server

Run the following command to start the server:

```bash
node dist/apps/api_grpc_tsproto/grpc_api_server.js
```

### Run the gRPC Client

Run the client:

```bash
node dist/apps/api_grpc_tsproto/grpc_api_client.js
```

## Conclusion

By using `protoc` and `ts-proto`, you can generate strongly-typed TypeScript code for your protobuf definitions, allowing you to build type-safe gRPC servers and clients in Node.js. With this setup, you can implement efficient, scalable, and maintainable APIs with gRPC, all while leveraging TypeScript's type safety and development tools.

