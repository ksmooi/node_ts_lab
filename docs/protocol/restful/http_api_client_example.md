# Building a RESTful API Client Component over HTTP

When designing API client components with **TypeScript** and **Object-Oriented (OO) design**, we aim to encapsulate the logic for making HTTP requests into reusable and modular classes. This way, the client can abstract the underlying details of interacting with the API and make the communication layer easier to maintain and test.

We’ll create a client to interact with the RESTful API we built in the previous article, focusing on **CRUD operations** for users. This client will handle HTTP requests and process responses efficiently.

Here’s how we can design the API client components using TypeScript and Object-Oriented principles:

### Table of Contents

1. Overview of the API Client
2. Project Setup and Dependencies
3. HTTP Client Class
4. User API Client Class
5. Error Handling and Response Processing
6. Usage and Integration
7. Conclusion

---

### 1. Overview of the API Client

The **API Client** will serve as an abstraction for making requests to the RESTful API. Using object-oriented design, we’ll create:
- A **BaseHttpClient** class to handle generic HTTP requests (GET, POST, PUT, DELETE).
- A **UserApiClient** class that extends the base client to interact with the specific `/users` endpoints.

### 2. Project Setup and Dependencies

We’ll use **Axios** to handle HTTP requests, as it provides a clean promise-based API with built-in support for modern features like request/response interceptors, and it works well with TypeScript.

Start by installing Axios and TypeScript types:

```bash
npm install axios
npm install @types/axios
```

---

### 3. HTTP Client Class

The `BaseHttpClient` will handle common HTTP request logic (GET, POST, PUT, DELETE). This class will be reusable, so any other API client class (like `UserApiClient`) can extend it and call these methods.

```typescript
// src/clients/baseHttpClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class BaseHttpClient {
  protected http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Generic GET method
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.http.get<T>(url, config);
    return response.data;
  }

  // Generic POST method
  protected async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.http.post<T>(url, data, config);
    return response.data;
  }

  // Generic PUT method
  protected async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.http.put<T>(url, data, config);
    return response.data;
  }

  // Generic DELETE method
  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.http.delete<T>(url, config);
    return response.data;
  }
}
```

#### Explanation:
- **Axios** is used as the HTTP client.
- The class initializes an Axios instance with a `baseURL` (e.g., the API root URL).
- Generic methods (`get`, `post`, `put`, `delete`) are provided, which handle the HTTP requests and responses. These methods return `Promise<T>`, where `T` is the expected type of the response data.

This base class can be reused to make any type of HTTP request in a structured way.

---

### 4. User API Client Class

We now create a `UserApiClient` class that extends `BaseHttpClient` to specifically handle operations related to the **User** entity (fetching users, creating a user, updating, and deleting).

```typescript
// src/clients/userApiClient.ts
import { BaseHttpClient } from './baseHttpClient';
import { User } from '../models/userModel';

export class UserApiClient extends BaseHttpClient {
  constructor(baseURL: string) {
    super(baseURL); // Call the BaseHttpClient constructor with baseURL
  }

  // Fetch all users
  async getAllUsers(): Promise<User[]> {
    return this.get<User[]>('/users');
  }

  // Fetch a user by ID
  async getUserById(id: number): Promise<User> {
    return this.get<User>(`/users/${id}`);
  }

  // Create a new user
  async createUser(name: string, email: string): Promise<User> {
    return this.post<User>('/users', { name, email });
  }

  // Update an existing user by ID
  async updateUser(id: number, name: string, email: string): Promise<User> {
    return this.put<User>(`/users/${id}`, { name, email });
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<void> {
    return this.delete<void>(`/users/${id}`);
  }
}
```

#### Explanation:
- `UserApiClient` extends `BaseHttpClient`, so it inherits the `get`, `post`, `put`, and `delete` methods.
- The class defines API-specific methods for interacting with users:
  - **getAllUsers()**: Fetches all users.
  - **getUserById()**: Fetches a single user by their ID.
  - **createUser()**: Creates a new user with a `name` and `email`.
  - **updateUser()**: Updates an existing user by `id`, modifying the `name` and `email`.
  - **deleteUser()**: Deletes a user by `id`.
  
The client abstracts the logic of interacting with the API, allowing you to manage users with simple function calls.

---

### 5. Error Handling and Response Processing

When working with HTTP clients, it's essential to handle errors gracefully. We can add error handling by extending the `BaseHttpClient` methods to catch any errors and standardize how they're processed.

Let's modify the `BaseHttpClient` to handle errors globally:

```typescript
// src/clients/baseHttpClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class BaseHttpClient {
  protected http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Generic GET method with error handling
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.get<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Generic POST method with error handling
  protected async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Generic PUT method with error handling
  protected async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Generic DELETE method with error handling
  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.delete<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Centralized error handling method
  private handleError(error: any): void {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error: ${error.message}`);
    } else {
      console.error(`Unknown error: ${error}`);
    }
    throw error;
  }
}
```

#### Explanation:
- **Error Handling**: We've added a `handleError` method that centralizes how errors are logged and rethrown. This ensures that any network or request error is handled consistently across the client.
- Each of the HTTP methods (`get`, `post`, `put`, `delete`) now includes a `try-catch` block to handle any exceptions raised by Axios.

---

### 6. Usage and Integration

Now that the client is ready, here’s how you can use it in an application:

```typescript
// src/index.ts
import { UserApiClient } from './clients/userApiClient';

const userApi = new UserApiClient('http://localhost:3000/api');

// Fetch all users
async function fetchAllUsers() {
  try {
    const users = await userApi.getAllUsers();
    console.log('All users:', users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}

// Create a new user
async function createNewUser() {
  try {
    const newUser = await userApi.createUser('John Doe', 'john@example.com');
    console.log('Created user:', newUser);
  } catch (error) {
    console.error('Failed to create user:', error);
  }
}

fetchAllUsers();
createNewUser();


```

#### Explanation:
- **`UserApiClient`** is instantiated with the base URL of your API.
- **CRUD operations** are performed by simply calling methods like `getAllUsers()` or `createUser()`.
- **Error handling** ensures that any issues during requests are logged, and the application remains robust.

---

### 7. Conclusion

Designing API client components using **Object-Oriented Design (OOD)** in **TypeScript** offers several advantages:
- **Encapsulation**: The logic for making HTTP requests is abstracted into a base client class, making the code modular and reusable.
- **Error Handling**: Centralizing error handling improves maintainability and ensures consistency across the application.
- **Scalability**: By extending the base client, you can easily add support for more APIs or entities (e.g., `ProductApiClient`, `OrderApiClient`).

This approach makes the API client more flexible, maintainable, and easier to test in a real-world application.

