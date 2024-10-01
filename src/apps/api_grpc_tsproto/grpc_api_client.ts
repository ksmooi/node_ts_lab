// npx ts-node src/apps/api_grpc_tsproto/grpc_api_client.ts

import { credentials } from '@grpc/grpc-js';    // Import gRPC credentials for making secure or insecure connections
import { ProductServiceClient } from './generated/product';  // Import the generated ProductServiceClient from the proto file
import {
    Empty,                   // Import the Empty message for methods that don't require inputs
    Product,                 // Import the Product message type
    GetProductRequest,        // Import the GetProductRequest message type
    CreateProductRequest,     // Import the CreateProductRequest message type
    UpdateProductRequest,     // Import the UpdateProductRequest message type
    DeleteProductRequest,     // Import the DeleteProductRequest message type
    ListProductsResponse,     // Import the ListProductsResponse message type
} from './generated/product'; // Import message types from the generated file

// Create a client instance to communicate with the gRPC server
const client = new ProductServiceClient('localhost:50051', credentials.createInsecure());  // Connect to the gRPC server running on localhost

/**
 * Creates a new product by sending a gRPC request.
 * @param request - The CreateProductRequest message containing product details.
 * @returns A Promise that resolves to a Product object.
 */
function createProduct(request: CreateProductRequest): Promise<Product> {
    return new Promise((resolve, reject) => {
        // Call the gRPC 'createProduct' method on the client
        client.createProduct(request, (error, response) => {
            if (error) {
                reject(error);  // Handle any errors by rejecting the promise
            } else {
                resolve(response);  // Resolve with the created product data
            }
        });
    });
}

/**
 * Lists all products by sending a gRPC request.
 * @returns A Promise that resolves to a ListProductsResponse containing all products.
 */
function listProducts(): Promise<ListProductsResponse> {
    return new Promise((resolve, reject) => {
        // Call the gRPC 'listProducts' method on the client
        client.listProducts(Empty.fromPartial({}), (error, response) => {
            if (error) {
                reject(error);  // Handle any errors by rejecting the promise
            } else {
                resolve(response);  // Resolve with the list of products
            }
        });
    });
}

/**
 * Gets a product by ID by sending a gRPC request.
 * @param request - The GetProductRequest message containing the product ID.
 * @returns A Promise that resolves to a Product object.
 */
function getProduct(request: GetProductRequest): Promise<Product> {
    return new Promise((resolve, reject) => {
        // Call the gRPC 'getProduct' method on the client
        client.getProduct(request, (error, response) => {
            if (error) {
                reject(error);  // Handle any errors by rejecting the promise
            } else {
                resolve(response);  // Resolve with the requested product
            }
        });
    });
}

/**
 * Updates an existing product by sending a gRPC request.
 * @param request - The UpdateProductRequest message containing the updated product details.
 * @returns A Promise that resolves to a Product object.
 */
function updateProduct(request: UpdateProductRequest): Promise<Product> {
    return new Promise((resolve, reject) => {
        // Call the gRPC 'updateProduct' method on the client
        client.updateProduct(request, (error, response) => {
            if (error) {
                reject(error);  // Handle any errors by rejecting the promise
            } else {
                resolve(response);  // Resolve with the updated product
            }
        });
    });
}

/**
 * Deletes a product by ID by sending a gRPC request.
 * @param request - The DeleteProductRequest message containing the product ID to delete.
 * @returns A Promise that resolves to an Empty message upon success.
 */
function deleteProduct(request: DeleteProductRequest): Promise<Empty> {
    return new Promise((resolve, reject) => {
        // Call the gRPC 'deleteProduct' method on the client
        client.deleteProduct(request, (error, response) => {
            if (error) {
                reject(error);  // Handle any errors by rejecting the promise
            } else {
                resolve(response);  // Resolve with an Empty response indicating success
            }
        });
    });
}

/**
 * Main function that demonstrates the use of the gRPC client by interacting with the ProductService.
 */
async function runGrpcApiClientSvc() {
    try {
        // Step 1: Create a new product
        const createRequest: CreateProductRequest = {
            product: {
                name: 'Sample Product',               // Define the name of the product
                description: 'This is a sample product',  // Define the description of the product
                price: 49.99,                        // Define the price of the product
            },
        };
        const createdProduct = await createProduct(createRequest);  // Await the creation of the product
        console.log('Created Product:', createdProduct);  // Output the created product to the console

        // Step 2: List all products
        const listResponse = await listProducts();  // Await the response from listing all products
        console.log('Product List:', listResponse.products);  // Output the list of products to the console

        // Step 3: Get the created product by ID
        if (createdProduct.id !== undefined) {  // Ensure the created product has a valid ID
            const getRequest: GetProductRequest = { id: createdProduct.id };  // Create the request to fetch the product by ID
            const fetchedProduct = await getProduct(getRequest);  // Await the response from fetching the product
            console.log('Fetched Product:', fetchedProduct);  // Output the fetched product to the console

            // Step 4: Update the product
            const updateRequest: UpdateProductRequest = {
                product: {
                    id: createdProduct.id,               // ID of the product to be updated
                    name: 'Updated Product',             // Updated name of the product
                    description: 'Updated description',  // Updated description of the product
                    price: 59.99,                        // Updated price of the product
                },
            };
            const updatedProduct = await updateProduct(updateRequest);  // Await the update of the product
            console.log('Updated Product:', updatedProduct);  // Output the updated product to the console

            // Step 5: Delete the product
            const deleteRequest: DeleteProductRequest = { id: createdProduct.id };  // Create the request to delete the product by ID
            await deleteProduct(deleteRequest);  // Await the deletion of the product
            console.log('Deleted Product with ID:', createdProduct.id);  // Confirm the deletion by logging the product ID
        } else {
            console.error('Created product does not have an ID.');  // Handle the case where the product does not have a valid ID
        }

        // Step 6: List all products again to confirm deletion
        const finalListResponse = await listProducts();  // Await the response from listing all products
        console.log('Final Product List:', finalListResponse.products);  // Output the final product list after deletion
    } catch (error) {
        console.error('Error:', error);  // Catch and log any errors that occur during the process
    }
}

// Execute the main function to run the gRPC client service
runGrpcApiClientSvc();
