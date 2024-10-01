// npx ts-node src/apps/api_grpc_websocket/grpc_api_client.ts

import WebSocket from 'ws';
import * as productProto from './generated/product_pb';

/**
 * Class representing the gRPC client.
 */
class MyProductServiceClient {
    private ws: WebSocket;

    /**
     * Creates an instance of MyProductServiceClient.
     * @param url - The WebSocket server URL.
     */
    constructor(url: string) {
        // Create a new WebSocket connection to the server
        this.ws = new WebSocket(url);

        // Event handler for incoming messages from the server
        this.ws.on('message', (data: WebSocket.Data) => {
            // Deserialize the envelope using protobuf
            const envelope = productProto.mypackage.Envelope.decode(Buffer.from(data as any));

            // Dispatch based on the method in the envelope
            switch (envelope.method) {
                case 'GetProduct':
                case 'CreateProduct':
                case 'UpdateProduct': {
                    const product = productProto.mypackage.Product.decode(envelope.payload);
                    console.log(`Received ${envelope.method} response:`, product);
                    break;
                }
                case 'DeleteProduct': {
                    console.log('Product deleted successfully');
                    break;
                }
                case 'ListProducts': {
                    const listResponse = productProto.mypackage.ListProductsResponse.decode(envelope.payload);
                    console.log('Received product list:', listResponse.products);
                    break;
                }
                default:
                    console.error(`Unknown method: ${envelope.method}`);
            }
        });

        // Event handler for when the connection is closed
        this.ws.on('close', () => {
            console.log('Connection closed');
        });
    }

    /**
     * Registers a callback for when the WebSocket connection is open.
     * @param callback - The function to execute once the connection is open.
     */
    public onOpen(callback: () => void) {
        if (this.ws.readyState === WebSocket.OPEN) {
            // If the connection is already open, execute the callback immediately
            callback();
        } else {
            // Otherwise, wait for the 'open' event
            this.ws.on('open', callback);
        }
    }

    /**
     * Sends a request to the server.
     * @param method - The method name.
     * @param payload - The serialized payload.
     */
    private sendRequest(method: string, payload: Uint8Array) {
        const envelope = productProto.mypackage.Envelope.create({ method, payload });
        const buffer = productProto.mypackage.Envelope.encode(envelope).finish();
        this.ws.send(buffer);
    }

    /**
     * Gets a product by ID.
     * @param id - The product ID.
     */
    public getProduct(id: number) {
        const request = productProto.mypackage.GetProductRequest.create({ id });
        const payload = productProto.mypackage.GetProductRequest.encode(request).finish();
        this.sendRequest('GetProduct', payload);
    }

    /**
     * Creates a new product.
     * @param product - The product data.
     */
    public createProduct(product: productProto.mypackage.IProduct) {
        const request = productProto.mypackage.CreateProductRequest.create({ product });
        const payload = productProto.mypackage.CreateProductRequest.encode(request).finish();
        this.sendRequest('CreateProduct', payload);
    }

    /**
     * Updates an existing product.
     * @param product - The product data.
     */
    public updateProduct(product: productProto.mypackage.IProduct) {
        const request = productProto.mypackage.UpdateProductRequest.create({ product });
        const payload = productProto.mypackage.UpdateProductRequest.encode(request).finish();
        this.sendRequest('UpdateProduct', payload);
    }

    /**
     * Deletes a product by ID.
     * @param id - The product ID.
     */
    public deleteProduct(id: number) {
        const request = productProto.mypackage.DeleteProductRequest.create({ id });
        const payload = productProto.mypackage.DeleteProductRequest.encode(request).finish();
        this.sendRequest('DeleteProduct', payload);
    }

    /**
     * Lists all products.
     */
    public listProducts() {
        const request = productProto.mypackage.Empty.create({});
        const payload = productProto.mypackage.Empty.encode(request).finish();
        this.sendRequest('ListProducts', payload);
    }
}

function runGrpcApiClientDemo() 
{
    // Create a new client instance and connect to the server
    const client = new MyProductServiceClient('ws://localhost:9001');

    // Use the client after the connection is open
    client.onOpen(() => {
        // Variable to store the created product ID
        let createdProductId: number;

        // Step 1: Create a new product
        client.createProduct({
            name: 'Product A',
            description: 'Description of Product A',
            price: 99.99,
        });

        // Step 2: After a short delay, list all products
        setTimeout(() => {
            console.log('\nListing all products after creation:');
            client.listProducts();
        }, 1000);

        // Step 3: After another delay, get the product by ID
        setTimeout(() => {
            // Assuming the created product has ID 1 (since it's the first one)
            createdProductId = 1;
            console.log(`\nGetting product with ID ${createdProductId}:`);
            client.getProduct(createdProductId);
        }, 2000);

        // Step 4: After another delay, update the product
        setTimeout(() => {
            console.log(`\nUpdating product with ID ${createdProductId}:`);
            client.updateProduct({
                id: createdProductId,
                name: 'Product A (Updated)',
                description: 'Updated description',
                price: 89.99,
            });
        }, 3000);

        // Step 5: After another delay, get the updated product by ID
        setTimeout(() => {
            console.log(`\nGetting updated product with ID ${createdProductId}:`);
            client.getProduct(createdProductId);
        }, 4000);

        // Step 6: After another delay, delete the product
        setTimeout(() => {
            console.log(`\nDeleting product with ID ${createdProductId}:`);
            client.deleteProduct(createdProductId);
        }, 5000);

        // Step 7: After another delay, list all products to confirm deletion
        setTimeout(() => {
            console.log('\nListing all products after deletion:');
            client.listProducts();
        }, 6000);
    });
}

runGrpcApiClientDemo();  // Run the gRPC client demo
