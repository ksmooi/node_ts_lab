# Building a RESTful API Server Component over HTTP

Building a RESTful API using **TypeScript** offers the best of both worlds: strict type safety and modern JavaScript features, leading to scalable, maintainable, and robust applications. When we pair this with **Object-Oriented Design (OOD)**, we can ensure that the structure of our code is modular, testable, and easier to manage. This article will guide you through building a RESTful API in TypeScript, focusing on core **CRUD** operations (Create, Read, Update, Delete) and leveraging **Object-Oriented Principles**.

### Table of Contents

1. Project Setup and Dependencies
2. Object-Oriented Design with Models
3. Service Layer: Encapsulating Business Logic
4. Controller Layer: Managing HTTP Requests
5. Routing and Endpoint Mapping
6. Finalizing the Express Application
7. Conclusion

---

### 1. Project Setup and Dependencies

Before we start coding, let's set up our project. We will use **Express** for handling HTTP requests, **TypeScript** for type safety, and **body-parser** to handle JSON request bodies.

Start by initializing your project and installing the necessary packages:

```bash
npm init -y
npm install express body-parser typescript @types/express ts-node @types/node
```

Next, set up your **tsconfig.json** to configure TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

This configuration ensures compatibility with Node.js and sets the project to use modern ES6 features.

---

### 2. Object-Oriented Design with Models

In an object-oriented design, data entities are represented as models. For our example, we'll create a `User` model, which will define the structure of a user object in our API.

```typescript
// src/models/userModel.ts
export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}
}
```

#### Explanation:
- The `User` class contains three properties: `id`, `name`, and `email`.
- The constructor ensures that every `User` instance will have these fields populated.

This model is the foundation of our API, representing the structure of the data that we will manage.

---

### 3. Service Layer: Encapsulating Business Logic

The **Service Layer** is where the business logic resides. It handles the core CRUD operations, and it interacts with the data. In our case, we’ll use an in-memory array to store users, but this can easily be replaced with a database in the future.

The service will be encapsulated inside the `UserController` class for better modularity and to follow **Dependency Injection** practices.

```typescript
// src/services/userService.ts
import { User } from '../models/userModel';

export class UserService {
  private users: User[] = [];
  private idCounter: number = 1;

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  createUser(name: string, email: string): User {
    const newUser = new User(this.idCounter++, name, email);
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, name: string, email: string): User | undefined {
    const user = this.getUserById(id);
    if (user) {
      user.name = name;
      user.email = email;
    }
    return user;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
```

#### Explanation:
- **`getAllUsers`**: Returns all users.
- **`getUserById`**: Finds a user by their `id`.
- **`createUser`**: Adds a new user with an auto-incrementing `id`.
- **`updateUser`**: Modifies the user’s `name` and `email`.
- **`deleteUser`**: Removes a user by their `id`.

By encapsulating these operations within a service, we ensure that the **UserController** remains focused on handling HTTP requests, keeping the business logic separate.

---

### 4. Controller Layer: Managing HTTP Requests

The **Controller Layer** is responsible for handling HTTP requests and interacting with the service layer. To follow good design principles, we encapsulate the `UserService` within the `UserController` class. This allows us to easily swap or mock the service in future tests or changes.

```typescript
// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  private userService: UserService;

  // Dependency Injection via constructor
  constructor(userService: UserService = new UserService()) {
    this.userService = userService;
  }

  // GET all users
  getAllUsers(req: Request, res: Response): void {
    const users = this.userService.getAllUsers();
    res.json(users);
  }

  // GET user by ID
  getUserById(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const user = this.userService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  // POST a new user
  createUser(req: Request, res: Response): void {
    const { name, email } = req.body;
    const newUser = this.userService.createUser(name, email);
    res.status(201).json(newUser);
  }

  // PUT (update) an existing user
  updateUser(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const { name, email } = req.body;
    const updatedUser = this.userService.updateUser(id, name, email);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  // DELETE a user
  deleteUser(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const success = this.userService.deleteUser(id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
}
```

#### Explanation:
- The **constructor** now accepts an instance of `UserService`, allowing for **dependency injection**, which improves testability.
- Each method corresponds to an HTTP operation:
  - **`getAllUsers`** (GET `/users`): Returns all users.
  - **`getUserById`** (GET `/users/:id`): Fetches a user by ID.
  - **`createUser`** (POST `/users`): Adds a new user.
  - **`updateUser`** (PUT `/users/:id`): Updates a user by ID.
  - **`deleteUser`** (DELETE `/users/:id`): Deletes a user by ID.

---

### 5. Routing and Endpoint Mapping

Routes map HTTP requests to the controller methods. This separates request routing from the core logic, keeping the application clean and maintainable.

```typescript
// src/routes/userRoutes.ts
import express from 'express';
import { UserController } from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers.bind(userController));
router.get('/users/:id', userController.getUserById.bind(userController));
router.post('/users', userController.createUser.bind(userController));
router.put('/users/:id', userController.updateUser.bind(userController));
router.delete('/users/:id', userController.deleteUser.bind(userController));

export default router;
```

#### Explanation:
- Each route maps an endpoint and HTTP method to the corresponding controller method.
- **`.bind(this)`** is used to ensure the correct context (`this`) is passed when calling controller methods, as the router would otherwise lose the class context.

---

### 6. Finalizing the Express Application

Now, we need to combine everything into our **Express** app. We will set up the middleware, including the `body-parser` for parsing JSON request bodies, and load the routes.

```typescript
// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

export default app;
```

Finally, we set up the server:

```typescript
// src/server.ts
import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

### 7. Conclusion

In this article, we demonstrated how to build a **RESTful API** using **TypeScript** with an **Object-Oriented Design** approach. By breaking down the application into the following layers:
- **Model**: Defines the structure of the data.
- **Service**: Encapsulates the business logic.
- **Controller**: Manages HTTP requests.
- **Routes**: Maps endpoints to controller methods.

We created a clean, scalable, and maintainable structure that adheres to modern software engineering principles. By using **TypeScript** and **Dependency Injection**, the API is flexible, type-safe, and ready for future enhancements.

This design pattern can easily be extended to handle more complex scenarios, such as adding database connections, implementing authentication, or integrating middleware for logging and validation.

