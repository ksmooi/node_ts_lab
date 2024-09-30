# TypeScript Coding Guidelines for Node.js Projects

TypeScript enhances the Node.js ecosystem by providing static typing and modern JavaScript features, which significantly improve the robustness, scalability, and maintainability of applications. While TypeScript offers many advantages, following best practices and coding guidelines is essential to fully leverage its capabilities in a Node.js environment.

This article provides a comprehensive set of coding guidelines for using TypeScript in Node.js projects, along with examples to help you write cleaner, more efficient, and maintainable code.

---

## 1. **Project Structure and Organization**

A well-structured project is critical for scalability and maintainability. In a TypeScript Node.js project, it’s common to organize code by separating business logic, routes, models, services, and utilities.

### Recommended Folder Structure

```plaintext
my-node-app/
│
├── src/                  # TypeScript source files
│   ├── config/           # Configuration (e.g., environment, constants)
│   ├── controllers/      # Controller logic (request handlers)
│   ├── routes/           # API route definitions
│   ├── models/           # Database models (e.g., Mongoose or Sequelize models)
│   ├── services/         # Business logic and services
│   ├── utils/            # Helper and utility functions
│   └── app.ts            # Main application entry point
│
├── dist/                 # Compiled JavaScript files (output directory)
├── node_modules/         # Installed dependencies
├── tsconfig.json         # TypeScript configuration
└── package.json          # NPM dependencies and scripts
```

### Example:

**`src/app.ts`** - Main entry point:

```typescript
import express, { Application } from 'express';
import { config } from './config/config';
import userRoutes from './routes/userRoutes';

const app: Application = express();
app.use(express.json());

// Register API routes
app.use('/users', userRoutes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 2. **Type Safety and Typing Guidelines**

TypeScript’s biggest advantage is its ability to provide type safety, reducing runtime errors and making code more predictable. To fully utilize TypeScript’s type system, follow these typing guidelines:

### a. **Use Explicit Types**

Always define types explicitly where possible to improve code readability and minimize errors.

#### Example:

```typescript
// Bad: Implicit types
const add = (a, b) => a + b;

// Good: Explicit types
const add = (a: number, b: number): number => a + b;
```

### b. **Use Interfaces for Object Structures**

Use **interfaces** to define the shape of objects and classes, making your code easier to understand and maintain.

#### Example:

```typescript
// Define an interface for User
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = (id: number): User => {
  return {
    id,
    name: 'John Doe',
    email: 'john.doe@example.com',
  };
};
```

### c. **Prefer `unknown` over `any`**

Avoid using `any` as it bypasses the type checking system. Instead, use `unknown` when you are unsure of the type and handle the validation explicitly.

#### Example:

```typescript
// Bad: Using any
function logData(data: any): void {
  console.log(data);
}

// Good: Using unknown
function logData(data: unknown): void {
  if (typeof data === 'string') {
    console.log(data.toUpperCase());
  }
}
```

### d. **Use Union and Literal Types**

Use **union types** and **literal types** to narrow down valid values, making the code more type-safe.

#### Example:

```typescript
type Status = 'active' | 'inactive' | 'suspended';

function setUserStatus(userId: number, status: Status): void {
  console.log(`Setting status for user ${userId}: ${status}`);
}
```

---

## 3. **Asynchronous Code and Error Handling**

Node.js applications often rely on asynchronous operations (e.g., database queries, API calls). TypeScript helps manage asynchronous code using `async/await` and ensures type-safe error handling.

### a. **Use Async/Await**

Prefer using `async/await` over callbacks or `.then()` for more readable and maintainable asynchronous code.

#### Example:

```typescript
// Bad: Using .then() for promise handling
getData().then((data) => {
  console.log(data);
}).catch((error) => {
  console.error(error);
});

// Good: Using async/await
async function fetchData() {
  try {
    const data = await getData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### b. **Proper Error Handling**

Always use `try-catch` blocks for handling errors in asynchronous functions. Ensure errors are caught and handled properly.

#### Example:

```typescript
async function fetchUserData(userId: number): Promise<User> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error; // Re-throw to handle upstream
  }
}
```

---

## 4. **Modularization and Reusability**

Organize your TypeScript code into smaller, reusable modules that focus on a single responsibility. This approach makes the code more maintainable and easier to test.

### a. **Separation of Concerns**

Each module should handle only one concern (e.g., routing, service logic, or data access). Use classes, functions, and modules to encapsulate functionality.

#### Example:

**`src/services/userService.ts`** - User service handling user logic:

```typescript
import { User } from '../models/User';

export class UserService {
  getUserById(id: number): User | null {
    // Fetch user from database or service
    return { id, name: 'John Doe', email: 'john@example.com' };
  }
}
```

**`src/routes/userRoutes.ts`** - Defining routes:

```typescript
import { Router, Request, Response } from 'express';
import { UserService } from '../services/userService';

const router: Router = Router();
const userService = new UserService();

router.get('/:id', (req: Request, res: Response) => {
  const user = userService.getUserById(Number(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

export default router;
```

### b. **Reuse Utility Functions**

Create utility functions for common tasks to avoid repetition. Keep these in a separate `utils` folder.

#### Example:

**`src/utils/calculate.ts`**:

```typescript
export function calculateSum(a: number, b: number): number {
  return a + b;
}
```

Use this utility function across different modules:

```typescript
import { calculateSum } from '../utils/calculate';

const result = calculateSum(10, 20);
console.log(result); // Output: 30
```

---

## 5. **Testing TypeScript Code**

Testing is an integral part of TypeScript projects to ensure correctness and type safety. You can use tools like **Jest** and **Supertest** to test both unit and integration levels of your application.

### a. **Setting Up Testing with Jest**

Install Jest and its TypeScript dependencies:

```bash
npm install --save-dev jest ts-jest @types/jest
```

Configure Jest in your `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

Create a Jest configuration file:

```bash
npx ts-jest config:init
```

### b. **Writing Unit Tests**

Write unit tests to verify individual functions or classes.

#### Example:

**`src/utils/calculate.test.ts`**:

```typescript
import { calculateSum } from './calculate';

test('calculates sum correctly', () => {
  expect(calculateSum(2, 3)).toBe(5);
});
```

Run your tests using:

```bash
npm run test
```

### c. **Testing Asynchronous Code**

Use `async/await` in Jest to test asynchronous functions.

#### Example:

```typescript
test('fetches user data', async () => {
  const userData = await fetchUserData(1);
  expect(userData).toBeDefined();
  expect(userData.name).toBe('John Doe');
});
```

---

## 6. **Environment and Configuration Management**

Use environment variables to manage sensitive information like API keys, database URLs, and environment-specific configurations.

### a. **Use `dotenv` for Environment Variables**

Install `dotenv` to load environment variables from a `.env` file:

```bash
npm install dotenv
```

Create a `.env` file:

```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydb
```

Load environment variables in your TypeScript code:

```typescript
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
```

---

## Conclusion

By following these coding guidelines for TypeScript in Node.js projects, you can build clean, scalable, and maintainable applications. TypeScript's static typing, along with modern JavaScript features, greatly enhances the quality of your code by reducing runtime errors and improving the overall developer experience. By structuring your projects well, using proper types, modularizing code, and following best practices for error handling and testing, you can write robust Node.js applications with TypeScript.

Whether you're building a small project or a large-scale application, these practices will help you create efficient and reliable TypeScript code in the Node.js ecosystem.

