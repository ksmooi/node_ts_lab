// npx ts-node src/apps/api_grpc_tsproto/grpc_api_server.ts

// Import necessary modules from gRPC and the generated TypeScript code for the Product service
import { Server, ServerCredentials, status } from '@grpc/grpc-js'; // gRPC server and status codes for error handling
import {
    ProductServiceService,        // The service definition from the generated product.proto file
    ProductServiceServer,         // The server-side interface for implementing the service methods
    Empty,                        // A message type representing an empty response
    Product,                      // A message type representing the Product entity
    GetProductRequest,            // A message type representing the GetProduct request
    CreateProductRequest,         // A message type representing the CreateProduct request
    UpdateProductRequest,         // A message type representing the UpdateProduct request
    DeleteProductRequest,         // A message type representing the DeleteProduct request
    ListProductsResponse,         // A message type representing the ListProducts response
} from './generated/product';     // Importing from the generated TypeScript files

// In-memory data store for products
const products: { [id: number]: Product } = {};  // Products stored as a map with product ID as the key
let nextProductId = 1;  // Counter to assign unique IDs to new products

/**
 * Implements the ProductService interface.
 * This object contains the actual logic for the RPC methods defined in the product.proto file.
 */
const productService: ProductServiceServer = {
    // Get a product by ID
    getProduct: (call, callback) => {
        const request: GetProductRequest = call.request;  // Extract the request object

        // Validate that the request contains a product ID
        if (request.id === undefined || request.id === null) {
            callback({
                code: status.INVALID_ARGUMENT,  // Return a gRPC INVALID_ARGUMENT error
                message: 'Product ID is required.',
            });
            return;
        }

        // Fetch the product from the in-memory data store
        const product = products[request.id];
        if (product) {
            callback(null, product);  // Send back the product if found
        } else {
            callback({
                code: status.NOT_FOUND,  // Return a gRPC NOT_FOUND error if product doesn't exist
                message: `Product with ID ${request.id} not found.`,
            });
        }
    },

    // Create a new product
    createProduct: (call, callback) => {
        const request: CreateProductRequest = call.request;  // Extract the request object
        const product = request.product;  // Extract the product data from the request

        // Validate that product data is provided
        if (!product) {
            callback({
                code: status.INVALID_ARGUMENT,  // Return a gRPC INVALID_ARGUMENT error if product data is missing
                message: 'Product data is required.',
            });
            return;
        }

        // Assign a unique ID to the new product and store it in the in-memory data store
        product.id = nextProductId++;
        products[product.id] = product;
        callback(null, product);  // Send back the newly created product
    },

    // Update an existing product
    updateProduct: (call, callback) => {
        const request: UpdateProductRequest = call.request;  // Extract the request object
        const product = request.product;  // Extract the updated product data from the request

        // Validate that product data is provided
        if (!product) {
            callback({
                code: status.INVALID_ARGUMENT,  // Return a gRPC INVALID_ARGUMENT error if product data is missing
                message: 'Product data is required.',
            });
            return;
        }

        // Validate that the product ID is provided
        if (product.id === undefined || product.id === null) {
            callback({
                code: status.INVALID_ARGUMENT,  // Return a gRPC INVALID_ARGUMENT error if ID is missing
                message: 'Product ID is required for update.',
            });
            return;
        }

        // Update the product if it exists, otherwise return a NOT_FOUND error
        if (products[product.id]) {
            products[product.id] = product;  // Update the product in the data store
            callback(null, product);  // Send back the updated product
        } else {
            callback({
                code: status.NOT_FOUND,  // Return a gRPC NOT_FOUND error if product doesn't exist
                message: `Product with ID ${product.id} not found.`,
            });
        }
    },

    // Delete a product by ID
    deleteProduct: (call, callback) => {
        const request: DeleteProductRequest = call.request;  // Extract the request object

        // Validate that the product ID is provided
        if (request.id === undefined || request.id === null) {
            callback({
                code: status.INVALID_ARGUMENT,  // Return a gRPC INVALID_ARGUMENT error if ID is missing
                message: 'Product ID is required for deletion.',
            });
            return;
        }

        // Delete the product if it exists, otherwise return a NOT_FOUND error
        if (products[request.id]) {
            delete products[request.id];  // Remove the product from the data store
            callback(null, Empty.fromPartial({}));  // Send an empty response indicating success
        } else {
            callback({
                code: status.NOT_FOUND,  // Return a gRPC NOT_FOUND error if product doesn't exist
                message: `Product with ID ${request.id} not found.`,
            });
        }
    },

    // List all products
    listProducts: (call, callback) => {
        // Create a response with the list of all products
        const response: ListProductsResponse = {
            products: Object.values(products),  // Convert the products object to an array
        };
        callback(null, response);  // Send back the list of products
    },
};

// Create and start the gRPC server
function runGrpcApiServerSvc() {
    const server = new Server();  // Create a new gRPC server instance
    server.addService(ProductServiceService, productService);  // Register the ProductService with the server
    const address = '0.0.0.0:50051';  // Set the server address and port

    // Bind the server to the address and start listening
    server.bindAsync(address, ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            console.error(`Server error: ${error.message}`);  // Handle any errors during server startup
            return;
        }
        console.log(`Server running at ${address}`);  // Log success message when server starts
    });
}

// Run the gRPC server by calling the main function
runGrpcApiServerSvc();
