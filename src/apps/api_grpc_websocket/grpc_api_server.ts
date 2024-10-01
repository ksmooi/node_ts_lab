// npx ts-node src/apps/api_grpc_websocket/grpc_api_server.ts

import { App } from 'uWebSockets.js';
import * as productProto from './generated/product_pb';

/**
 * Class representing the Product service implementation.
 */
class MyProductServiceServer {
    // In-memory data store for products
    private products: { [key: number]: productProto.mypackage.IProduct } = {};
    private nextProductId: number = 1;

    /**
     * Gets a product by ID.
     * @param request - The GetProductRequest message.
     * @returns A Promise that resolves to a Product message.
     */
    public async getProduct(request: productProto.mypackage.IGetProductRequest): Promise<productProto.mypackage.IProduct> {
        // Ensure that request.id is not null or undefined
        if (request.id === null || request.id === undefined) {
            throw new Error("Product ID is required.");
        }

        const product = this.products[request.id];
        if (!product) {
            throw new Error(`Product with ID ${request.id} not found.`);
        }
        return product;
    }

    /**
     * Creates a new product.
     * @param request - The CreateProductRequest message.
     * @returns A Promise that resolves to the created Product message.
     */
    public async createProduct(request: productProto.mypackage.ICreateProductRequest): Promise<productProto.mypackage.IProduct> {
        const product = request.product;
        if (!product) {
            throw new Error("Product data is required.");
        }

        // Assign a new ID to the product
        product.id = this.nextProductId++;

        // Save the product in the in-memory store
        this.products[product.id] = product;
        return product;
    }

    /**
     * Updates an existing product.
     * @param request - The UpdateProductRequest message.
     * @returns A Promise that resolves to the updated Product message.
     */
    public async updateProduct(request: productProto.mypackage.IUpdateProductRequest): Promise<productProto.mypackage.IProduct> {
        const product = request.product;
        if (!product) {
            throw new Error("Product data is required.");
        }

        if (product.id === null || product.id === undefined) {
            throw new Error("Product ID is required for update.");
        }

        if (this.products[product.id]) {
            this.products[product.id] = product;
            return product;
        } else {
            throw new Error(`Product with ID ${product.id} not found.`);
        }
    }

    /**
     * Deletes a product by ID.
     * @param request - The DeleteProductRequest message.
     * @returns A Promise that resolves to an empty message.
     */
    public async deleteProduct(request: productProto.mypackage.IDeleteProductRequest): Promise<productProto.mypackage.IEmpty> {
        if (request.id === null || request.id === undefined) {
            throw new Error("Product ID is required for deletion.");
        }

        if (this.products[request.id]) {
            delete this.products[request.id];
            return {};
        } else {
            throw new Error(`Product with ID ${request.id} not found.`);
        }
    }

    /**
     * Lists all products.
     * @param request - The Empty message.
     * @returns A Promise that resolves to a ListProductsResponse message.
     */
    public async listProducts(request: productProto.mypackage.IEmpty): Promise<productProto.mypackage.IListProductsResponse> {
        const productsArray = Object.values(this.products);
        return { products: productsArray };
    }
}

function runGrpcApiServerDemo() 
{
    // Instantiate the uWebSockets.js application
    const app = App();

    // Create an instance of the service handler
    const service = new MyProductServiceServer();

    // Set up the WebSocket route
    app.ws('/*', {
        // Handle new WebSocket connections
        open: (ws) => {
            console.log('A WebSocket connected!');
        },

        // Handle incoming messages
        message: async (ws, message, isBinary) => {
            try {
                // Convert the message to a Buffer
                const buffer = Buffer.from(message);

                // Decode the incoming message using protobuf
                const envelope = productProto.mypackage.Envelope.decode(buffer);

                let responseBuffer: Uint8Array;

                // Dispatch based on the RPC method
                switch (envelope.method) {
                    case 'GetProduct': {
                        const getProductRequest = productProto.mypackage.GetProductRequest.decode(envelope.payload);
                        const getProductResponse = await service.getProduct(getProductRequest);
                        const responseEnvelope = productProto.mypackage.Envelope.create({
                            method: 'GetProduct',
                            payload: productProto.mypackage.Product.encode(getProductResponse).finish(),
                        });
                        responseBuffer = productProto.mypackage.Envelope.encode(responseEnvelope).finish();
                        break;
                    }
                    case 'CreateProduct': {
                        const createProductRequest = productProto.mypackage.CreateProductRequest.decode(envelope.payload);
                        const createProductResponse = await service.createProduct(createProductRequest);
                        const responseEnvelope = productProto.mypackage.Envelope.create({
                            method: 'CreateProduct',
                            payload: productProto.mypackage.Product.encode(createProductResponse).finish(),
                        });
                        responseBuffer = productProto.mypackage.Envelope.encode(responseEnvelope).finish();
                        break;
                    }
                    case 'UpdateProduct': {
                        const updateProductRequest = productProto.mypackage.UpdateProductRequest.decode(envelope.payload);
                        const updateProductResponse = await service.updateProduct(updateProductRequest);
                        const responseEnvelope = productProto.mypackage.Envelope.create({
                            method: 'UpdateProduct',
                            payload: productProto.mypackage.Product.encode(updateProductResponse).finish(),
                        });
                        responseBuffer = productProto.mypackage.Envelope.encode(responseEnvelope).finish();
                        break;
                    }
                    case 'DeleteProduct': {
                        const deleteProductRequest = productProto.mypackage.DeleteProductRequest.decode(envelope.payload);
                        await service.deleteProduct(deleteProductRequest);
                        const responseEnvelope = productProto.mypackage.Envelope.create({
                            method: 'DeleteProduct',
                            payload: new Uint8Array(),
                        });
                        responseBuffer = productProto.mypackage.Envelope.encode(responseEnvelope).finish();
                        break;
                    }
                    case 'ListProducts': {
                        const listProductsResponse = await service.listProducts({});
                        const responseEnvelope = productProto.mypackage.Envelope.create({
                            method: 'ListProducts',
                            payload: productProto.mypackage.ListProductsResponse.encode(listProductsResponse).finish(),
                        });
                        responseBuffer = productProto.mypackage.Envelope.encode(responseEnvelope).finish();
                        break;
                    }
                    default:
                        throw new Error(`Unknown method: ${envelope.method}`);
                }

                // Send the response back to the client
                ws.send(responseBuffer, true);

            } catch (err) {
                if (err instanceof Error) {
                    console.error('Error handling message:', err.message);
                } else {
                    console.error('Unknown error:', err);
                }
            }
        },

        // Handle WebSocket disconnections
        close: (ws, code, message) => {
            console.log('A WebSocket closed!');
        }
    });

    // Start the server and listen on port 9001
    app.listen(9001, (token) => {
        if (token) {
            console.log('Server is listening on port 9001');
        } else {
            console.log('Failed to listen on port 9001');
        }
    });
}

runGrpcApiServerDemo();  // Run the gRPC client demo
