// npx ts-node src/apps/api_restful/restful_api_server.ts

// Import necessary modules from express and body-parser
import express, { Request, Response } from 'express';   // Express framework for building web apps
import bodyParser from 'body-parser';                   // Middleware to parse incoming request bodies

// === Product class representing a product entity ===
class Product {
    constructor(
        public id: number,    // Product ID
        public name: string,  // Product name
        public price: number  // Product price
    ) {}
}

// === ProductService class that manages product data ===
class ProductService {
    private products: Product[] = [];  // Array to store the products
    private nextId = 1;                // Auto-incremented product ID for new products

    // Get all products in the list
    getAllProducts(): Product[] {
        return this.products;
    }

    // Find a product by its ID
    getProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    // Add a new product with a unique ID, name, and price
    addProduct(name: string, price: number): Product {
        const product = new Product(this.nextId++, name, price);
        this.products.push(product); // Add the new product to the array
        return product;              // Return the created product
    }

    // Update an existing product's name and price by its ID
    updateProduct(id: number, name: string, price: number): Product | undefined {
        const product = this.getProductById(id); // Fetch the product by ID
        if (product) {
            product.name = name;   // Update the product's name
            product.price = price; // Update the product's price
        }
        return product;            // Return the updated product (or undefined if not found)
    }

    // Delete a product by its ID
    deleteProduct(id: number): boolean {
        const index = this.products.findIndex(product => product.id === id); // Find index of the product
        if (index !== -1) {
            this.products.splice(index, 1); // Remove the product from the array
            return true;                    // Return true if deletion was successful
        }
        return false;                       // Return false if product not found
    }
}

// === ProductController class that handles API requests and responses ===
class ProductController {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService; // Dependency injection of ProductService
    }

    // Handle GET request to retrieve all products
    getAllProducts(req: Request, res: Response): void {
        const products = this.productService.getAllProducts(); // Get all products from ProductService
        res.json(products); // Send the product array as JSON response
    }

    // Handle GET request to retrieve a product by ID
    getProductById(req: Request, res: Response): void {
        const id = parseInt(req.params.id, 10);                     // Parse ID from URL parameters
        const product = this.productService.getProductById(id);     // Get the product by ID
        if (product) {
            res.json(product);                          // Send the product as JSON if found
        } else {
            res.status(404).send('Product not found');  // Send 404 if not found
        }
    }

    // Handle POST request to create a new product
    createProduct(req: Request, res: Response): void {
        const { name, price } = req.body; // Extract name and price from the request body
        const product = this.productService.addProduct(name, parseFloat(price)); // Create new product
        res.status(201).json(product); // Send 201 response with the created product
    }

    // Handle PUT request to update an existing product
    updateProduct(req: Request, res: Response): void {
        const id = parseInt(req.params.id, 10); // Parse ID from URL parameters
        const { name, price } = req.body;       // Extract name and price from the request body
        const product = this.productService.updateProduct(id, name, parseFloat(price)); // Update product
        if (product) {
            res.json(product);                          // Send updated product as JSON
        } else {
            res.status(404).send('Product not found');  // Send 404 if product not found
        }
    }

    // Handle DELETE request to remove a product by ID
    deleteProduct(req: Request, res: Response): void {
        const id = parseInt(req.params.id, 10); // Parse ID from URL parameters
        const success = this.productService.deleteProduct(id); // Delete the product
        if (success) {
            res.status(204).send();                     // Send 204 response if successful (No Content)
        } else {
            res.status(404).send('Product not found');  // Send 404 if product not found
        }
    }
}

// === Wrap the Express app setup into a main function ===
function runRestfulApiServerDemo() {
    const app = express();                                 // Initialize the Express app
    const productService = new ProductService();           // Create an instance of ProductService
    const productController = new ProductController(productService); // Inject ProductService into ProductController

    app.use(bodyParser.json());                            // Use body-parser middleware to parse JSON request bodies

    // Define API routes
    app.get('/products', (req: Request, res: Response) => productController.getAllProducts(req, res)); // GET all products
    app.get('/products/:id', (req: Request, res: Response) => productController.getProductById(req, res)); // GET a product by ID
    app.post('/products', (req: Request, res: Response) => productController.createProduct(req, res)); // POST to create a new product
    app.put('/products/:id', (req: Request, res: Response) => productController.updateProduct(req, res)); // PUT to update an existing product
    app.delete('/products/:id', (req: Request, res: Response) => productController.deleteProduct(req, res)); // DELETE a product by ID

    // Start the server on port 3000
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`); // Server startup log
    });
}

// Call the main function to start the server
runRestfulApiServerDemo();
