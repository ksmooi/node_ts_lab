## RESTful API Server and Client Project (TypeScript)

This project demonstrates how to build a **RESTful API server** using **Express** and a **client** that interacts with the API using **Axios**. Both components are built in **TypeScript** and follow Object-Oriented (OO) principles.

### Project Structure

```
/src
  └── /apps
      └── /api_restful
          ├── restful_api_server.ts  // RESTful API server implementation
          └── restful_api_client.ts  // RESTful API client implementation
```

### Technologies Used
- **Node.js**: JavaScript runtime.
- **TypeScript**: Typed superset of JavaScript.
- **Express**: Web framework for building the API server.
- **Axios**: HTTP client used in the client to make requests.
- **body-parser**: Middleware for parsing JSON request bodies.
- **ts-node**: TypeScript execution environment for Node.js.

### Requirements

- **Node.js** version: `>=16.x.x`
- **npm** version: `>=8.x.x`

### Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   Install the required npm packages:
   ```bash
   npm install express body-parser axios
   npm install --save-dev typescript @types/express @types/body-parser @types/node @types/axios ts-node
   ```

3. **Configure TypeScript**:
   Create a `tsconfig.json` file if you don't already have one:

   ```json
   {
     "compilerOptions": {
       "target": "ES2021",
       "module": "CommonJS",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     },
     "include": ["src/**/*"]
   }
   ```

### Running the Server

1. **Start the RESTful API server**:
   The server is written using Express and listens on port 3000.

   To run the server:

   ```bash
   npx ts-node src/apps/api_restful/restful_api_server.ts
   ```

   The server will start and listen on `http://localhost:3000`.

### API Endpoints

The RESTful API exposes the following endpoints:

- **GET** `/products`: Retrieve all products.
- **GET** `/products/:id`: Retrieve a specific product by ID.
- **POST** `/products`: Create a new product.
  - **Request Body**: `{ "name": "string", "price": "number" }`
- **PUT** `/products/:id`: Update an existing product by ID.
  - **Request Body**: `{ "name": "string", "price": "number" }`
- **DELETE** `/products/:id`: Delete a product by ID.

### Running the Client

1. **Run the RESTful API client**:
   The client sends requests to the API server and performs CRUD (Create, Read, Update, Delete) operations on the product data.

   To run the client:

   ```bash
   npx ts-node src/apps/api_restful/restful_api_client.ts
   ```

   The client will:
   - Create a new product.
   - Fetch all products.
   - Fetch a specific product by ID.
   - Update the product.
   - Delete the product.
   - Fetch all products again after deletion.

### Example Client Output

```
Created Product: { id: 1, name: 'Laptop', price: 1500 }
All Products: [ { id: 1, name: 'Laptop', price: 1500 } ]
Fetched Product by ID: { id: 1, name: 'Laptop', price: 1500 }
Updated Product: { id: 1, name: 'Gaming Laptop', price: 1800 }
Deleted Product with ID: 1
Products after deletion: []
```

### Code Explanation

#### Server (restful_api_server.ts):

1. **Product class**: Defines a `Product` entity with `id`, `name`, and `price`.
2. **ProductService class**: Manages product data, including CRUD operations (create, read, update, delete).
3. **ProductController class**: Handles API requests and responses using `ProductService`.
4. **Express App**: The main Express app defines routes and starts the server.

#### Client (restful_api_client.ts):

1. **Product class**: Matches the server-side product structure.
2. **ProductClient class**: Handles HTTP requests to the API using Axios.
3. **runRestfulApiClientDemo function**: Demonstrates the usage of the client, sending requests to the server and printing the results.

### Notes

- This example uses `ts-node` to run TypeScript files directly. For production, you would want to compile the TypeScript files to JavaScript using `tsc` (TypeScript Compiler) and run the compiled JavaScript files.
- **Error handling**: Ensure proper error handling in production environments. This demo uses basic error handling with HTTP status codes (e.g., 404 for "Product not found").

### Future Improvements

- Add more robust validation and error handling for the API.
- Implement pagination for the `/products` endpoint.
- Expand the client demo with more advanced use cases (e.g., bulk creation, filtering).

