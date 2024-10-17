// npx ts-node src/apps/api_restful/restful_api_client.ts

// Import axios and AxiosResponse for making HTTP requests and handling responses
import axios, { AxiosResponse } from 'axios';

// Product class to match the API's data structure
class Product {
    constructor(
        public id: number,      // Product ID
        public name: string,    // Product name
        public price: number    // Product price
    ) {}
}

// ProductClient class that wraps Axios calls to the REST API
class ProductClient {
    private apiUrl = 'http://localhost:3000/products';  // Base URL for the product API

    // Fetch all products
    async getAllProducts(): Promise<Product[]> {
        const response: AxiosResponse<Product[]> = await axios.get(this.apiUrl); // Make a GET request
        return response.data;  // Return the response data (list of products)
    }

    // Fetch a product by ID
    async getProductById(id: number): Promise<Product> {
        const response: AxiosResponse<Product> = await axios.get(`${this.apiUrl}/${id}`); // GET by ID
        return response.data;  // Return the product data
    }

    // Create a new product
    async createProduct(name: string, price: number): Promise<Product> {
        const response: AxiosResponse<Product> = await axios.post(this.apiUrl, { name, price }); // POST request
        return response.data;  // Return the newly created product
    }

    // Update a product by ID
    async updateProduct(id: number, name: string, price: number): Promise<Product> {
        const response: AxiosResponse<Product> = await axios.put(`${this.apiUrl}/${id}`, { name, price }); // PUT request
        return response.data;  // Return the updated product
    }

    // Delete a product by ID
    async deleteProduct(id: number): Promise<void> {
        await axios.delete(`${this.apiUrl}/${id}`);  // Send DELETE request, no response data returned
    }
}

// Demo the ProductClient functionality
async function runRestfulApiClientDemo() {
    const productClient = new ProductClient();  // Create a new instance of ProductClient

    // Create a new product
    const newProduct = await productClient.createProduct('Laptop', 1500);
    console.log('Created Product:', newProduct);  // Output the created product

    // Get all products
    const products = await productClient.getAllProducts();
    console.log('All Products:', products);  // Output all products in the list

    // Get a product by ID
    const fetchedProduct = await productClient.getProductById(newProduct.id);
    console.log('Fetched Product by ID:', fetchedProduct);  // Output the product fetched by its ID

    // Update the product
    const updatedProduct = await productClient.updateProduct(newProduct.id, 'Gaming Laptop', 1800);
    console.log('Updated Product:', updatedProduct);  // Output the updated product details

    // Delete the product
    await productClient.deleteProduct(newProduct.id);
    console.log('Deleted Product with ID:', newProduct.id);  // Confirm the deletion by outputting the product ID

    // Get all products after deletion
    const productsAfterDelete = await productClient.getAllProducts();
    console.log('Products after deletion:', productsAfterDelete);  // Output the remaining products after deletion
}

// Run the client demo function
runRestfulApiClientDemo();
