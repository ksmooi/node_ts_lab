# Exploring Axios in Node.js: A Complete Guide with TypeScript

In modern web development, **making HTTP requests** to external services or APIs is a common requirement. Whether you need to interact with a third-party API, fetch data from an external source, or perform asynchronous operations in a Node.js environment, **Axios** has become a popular and reliable choice for developers.

In this article, we'll explore how to use **Axios** in **Node.js**, highlighting its powerful features. We'll also use **TypeScript** to leverage type safety, making our HTTP requests more predictable and maintainable.

### Table of Contents

1. What is Axios?
2. Why Use Axios in Node.js?
3. Key Features of Axios
4. Installing Axios with TypeScript
5. Making HTTP Requests with Axios
6. Handling Responses and Errors
7. Axios Configuration and Interceptors
8. Axios Instances for Reusability
9. Conclusion

---

### 1. What is Axios?

**Axios** is a promise-based HTTP client for **Node.js** and the browser. It simplifies the process of making asynchronous HTTP requests to REST endpoints and interacting with web services. It supports **promises** and provides a clean, easy-to-use API that handles various HTTP methods (GET, POST, PUT, DELETE, etc.).

Axios is widely used in both Node.js server-side applications and client-side applications in the browser. It's especially favored in the **Node.js** ecosystem because of its versatility, ease of use, and support for JSON.

---

### 2. Why Use Axios in Node.js?

While **Node.js** has a built-in `http` and `https` module for making HTTP requests, those can be cumbersome to work with, especially when it comes to handling JSON data, managing complex request configurations, and handling responses. Axios provides a much more convenient API that abstracts away much of this complexity, allowing you to focus on writing application logic.

**Key reasons to use Axios in Node.js:**
- **Promise-based API**: Axios makes working with asynchronous requests simpler using promises (or async/await).
- **Automatic JSON handling**: It automatically transforms JSON data to/from JavaScript objects.
- **Interceptors**: Axios allows you to intercept requests or responses before they are handled, enabling custom pre-processing.
- **Timeouts and cancellation**: You can easily set timeouts for requests and cancel them if needed.
- **Browser and Node.js support**: Axios is versatile and can run in both the browser and Node.js environments.

---

### 3. Key Features of Axios

Some of the notable features of Axios include:
- **Request Methods**: Support for HTTP request methods like `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, and more.
- **Automatic JSON Transformation**: Automatically converts request and response data to JSON.
- **Request and Response Interceptors**: Allows you to transform requests or responses before they are handled.
- **Request Timeout**: You can set a maximum timeout period for your requests.
- **Cancellation**: Supports canceling requests using **CancelToken**.
- **Axios Instances**: Create custom instances with default configurations for repeated use.
- **File Upload and Download**: Axios allows you to handle binary data easily, making file uploads and downloads simple.

---

### 4. Installing Axios with TypeScript

To get started with Axios in a **Node.js** and **TypeScript** environment, you'll need to install both Axios and the TypeScript types for Axios.

#### Installation:

```bash
npm install axios
npm install @types/axios --save-dev
```

Now, let’s dive into making HTTP requests with Axios.

---

### 5. Making HTTP Requests with Axios

Axios simplifies HTTP requests in Node.js. Below are examples of how to make different types of requests using Axios and TypeScript.

#### Example 1: Making a GET Request

Let’s start with a simple **GET** request to fetch data from an API.

```typescript
import axios from 'axios';

async function getUser() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    console.log(response.data);  // The response data will be a JSON object
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

getUser();
```

#### Explanation:
- **`axios.get()`**: Performs a GET request to the given URL.
- **`response.data`**: Axios automatically parses the JSON response data.
- **`async/await`**: We use async/await syntax to make the request asynchronous.

#### Example 2: Making a POST Request

Next, we’ll make a **POST** request to send data to an API.

```typescript
import axios from 'axios';

async function createUser() {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();
```

#### Explanation:
- **`axios.post()`**: Sends a POST request to the API.
- The second argument is the payload (request body), which is automatically converted to JSON.

---

### 6. Handling Responses and Errors

Axios automatically parses JSON responses, but handling errors is important. Axios provides a clean way to deal with different types of errors (network errors, status code errors, etc.).

#### Handling Successful Responses

Axios responses contain several useful fields:
- **`data`**: The data returned from the server.
- **`status`**: The HTTP status code (e.g., 200 for OK).
- **`headers`**: The response headers.

```typescript
import axios from 'axios';

async function getUser() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

getUser();
```

#### Handling Errors

When an error occurs (e.g., the server returns a 404 or 500 error), Axios throws an error. You can inspect the error object to handle different error types.

```typescript
import axios from 'axios';

async function getUser() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1000'); // This will 404
    console.log('User data:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

getUser();
```

#### Explanation:
- **`axios.isAxiosError()`**: This checks if the error is an Axios-specific error.
- **`error.response?.status`**: You can inspect the error response, such as status codes (404, 500, etc.).

---

### 7. Axios Configuration and Interceptors

Axios provides powerful configuration options that can be applied globally or to specific requests. Additionally, **interceptors** allow you to transform requests or responses before they are handled by the `then` or `catch` blocks.

#### Global Axios Configuration

You can set default configurations that apply to all requests:

```typescript
import axios from 'axios';

// Set default base URL and headers
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'Bearer token';

// Making a GET request with default configuration
async function fetchUsers() {
  const response = await axios.get('/users');
  console.log(response.data);
}

fetchUsers();
```

#### Request Interceptors

You can intercept requests to modify or log them before they are sent to the server.

```typescript
import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use((config) => {
  console.log('Request made with ', config);
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Example request
async function fetchUsers() {
  const response = await axios.get('/users');
  console.log(response.data);
}

fetchUsers();
```

#### Response Interceptors

Response interceptors allow you to modify the response data or handle errors globally.

```typescript
import axios from 'axios';

// Add a response interceptor
axios.interceptors.response.use((response) => {
  console.log('Response received:', response);
  return response;
}, (error) => {
  console.error('Error occurred:', error);
  return Promise.reject(error);
});

// Example request
async function fetchUsers() {
  const response = await axios.get('/users');
  console.log(response.data);
}

fetchUsers();
```

---

### 8. Axios Instances for Reusability

If you’re working with multiple APIs or need different configurations for different services, you can create **Axios instances** with custom configurations.

#### Creating an Axios Instance

```typescript
import axios, { AxiosInstance } from 'axios';

// Create a custom Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

// Using the custom Axios instance
async function getUsers() {
  const response = await apiClient.get('/users');
  console.log(response.data);
}

getUsers();
```

#### Explanation:
- **`axios.create()`**: Creates an Axios instance with a base URL, timeout, and headers.
- Each request made through `apiClient` will use these default configurations, making it easy to reuse common settings across different parts of your application.

---

### 9. Conclusion



**Axios** is a powerful and flexible HTTP client for **Node.js** that simplifies the process of making HTTP requests. With features like automatic JSON parsing, request and response interceptors, custom Axios instances, and comprehensive error handling, Axios becomes a valuable tool in any Node.js developer's toolkit.

Using **TypeScript** with Axios enhances the development experience by adding type safety and code predictability, allowing you to catch errors early and write more robust applications.

By leveraging Axios, you can efficiently build applications that interact with external APIs or services, handle asynchronous tasks gracefully, and streamline the HTTP request-response cycle.

