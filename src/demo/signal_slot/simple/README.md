# Signal-Slot Simple Example

This repository presents a **Signal-Slot** pattern implementation in TypeScript using an object-oriented (OO) approach. The example demonstrates how to achieve decoupled communication between different services within an application, enhancing modularity and maintainability.

## Table of Contents

- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
  - [1. `UserService`](#1-userservice)
  - [2. `EmailService`](#2-emailservice)
  - [3. `LoggerService`](#3-loggerservice)
  - [4. `main.ts`](#4-maintssignal_slotsimple)
- [Execution Flow](#execution-flow)
- [Running the Example](#running-the-example)
- [Expected Output](#expected-output)
- [Conclusion](#conclusion)

---

## Project Structure

```
src/demo/signal_slot/simple/
├── emailService.ts
├── loggerService.ts
├── main.ts
└── userService.ts
```

- **`userService.ts`**: Manages user registrations and emits signals upon successful registration.
- **`emailService.ts`**: Listens for user registration signals to send welcome emails.
- **`loggerService.ts`**: Listens for user registration signals to log registration events.
- **`main.ts`**: Sets up the services, establishes signal-slot connections, and initiates user registrations.

---

## Components Overview

### 1. `UserService`

**Purpose**: Handles user registrations within the application. When a new user is registered, `UserService` emits a `userRegistered` signal containing the user's information. This signal serves as a notification to other components that a new user has been successfully added.

### 2. `EmailService`

**Purpose**: Responsible for sending welcome emails to newly registered users. It listens for the `userRegistered` signal emitted by `UserService`. Upon receiving this signal, `EmailService` triggers its `sendWelcomeEmail` method to dispatch a personalized welcome message to the user's email address.

### 3. `LoggerService`

**Purpose**: Manages logging of user registration events. Similar to `EmailService`, `LoggerService` subscribes to the `userRegistered` signal. When notified of a new user registration, it records the event details, such as the user's ID and email, facilitating audit trails and monitoring.

### 4. `main.ts`

**Purpose**: Acts as the entry point of the application. In this script:

- Instances of `UserService`, `EmailService`, and `LoggerService` are created.
- Signal-slot connections are established, linking the `userRegistered` signal from `UserService` to the respective methods in `EmailService` and `LoggerService`.
- User registrations are simulated by invoking the `registerUser` method of `UserService`, demonstrating how the interconnected services respond to these events.

---

## Execution Flow

1. **Initialization**:
   - `UserService`, `EmailService`, and `LoggerService` instances are instantiated.
   - The `userRegistered` signal from `UserService` is connected to the `sendWelcomeEmail` method of `EmailService` and the `logRegistration` method of `LoggerService`.

2. **User Registration**:
   - The `registerUser` method of `UserService` is called with user details (e.g., name and email).
   - Upon registering a user, `UserService` emits the `userRegistered` signal, passing the new user's information.

3. **Signal Handling**:
   - **`EmailService`** receives the `userRegistered` signal and executes `sendWelcomeEmail`, sending a welcome email to the user's email address.
   - **`LoggerService`** also receives the same signal and executes `logRegistration`, logging the registration event details.

4. **Decoupled Communication**:
   - The use of signals and slots ensures that `UserService` remains unaware of the internal workings of `EmailService` and `LoggerService`, promoting loose coupling and enhancing the application's scalability.

---

## Running the Example

To execute the example, follow these steps:

1. **Clone the Repository**:
   
   ```bash
   git clone https://github.com/your-username/signal-slot-simple-example.git
   cd signal-slot-simple-example
   ```

2. **Install Dependencies**:
   
   Ensure you have Node.js and npm installed. Then, install the necessary packages:
   
   ```bash
   npm install
   ```

3. **Compile TypeScript to JavaScript**:
   
   If TypeScript is not installed globally, install it as a development dependency:
   
   ```bash
   npm install typescript --save-dev
   ```
   
   Compile the TypeScript files:
   
   ```bash
   npx tsc
   ```

4. **Run the Compiled Script**:
   
   Execute the `main.js` file using Node.js:
   
   ```bash
   node dist/demo/signal_slot/simple/main.js
   ```

---

## Expected Output

Upon running the example, the console should display logs indicating the flow of user registrations and the corresponding actions taken by the connected services:

```
UserService: Registered user Alice
EmailService: Sending welcome email to alice@example.com
LoggerService: User Alice with email alice@example.com has registered.
UserService: Registered user Bob
EmailService: Sending welcome email to bob@example.com
LoggerService: User Bob with email bob@example.com has registered.
```

**Explanation**:

1. **User Registration**:
   - `UserService` registers a new user named Alice and emits the `userRegistered` signal.
   
2. **Email Dispatch**:
   - `EmailService` listens for the `userRegistered` signal and sends a welcome email to Alice's email address.
   
3. **Event Logging**:
   - `LoggerService` also listens for the same signal and logs Alice's registration details.
   
4. **Repeat for Additional Users**:
   - The process repeats similarly for subsequent user registrations, such as Bob in this example.

---

## Conclusion

The **Signal-Slot Simple Example** effectively demonstrates how to implement the signal-slot pattern in a TypeScript application using an object-oriented design. By decoupling the `UserService` from the `EmailService` and `LoggerService`, the application achieves greater modularity, making it easier to maintain and extend.

**Key Benefits**:

- **Loose Coupling**: Services communicate through signals and slots without direct dependencies, enhancing flexibility.
- **Scalability**: Easily add more services that listen to the same signals without modifying existing code.
- **Maintainability**: Isolated services simplify debugging and future enhancements.

This pattern is particularly useful in large-scale applications where multiple components need to respond to shared events, ensuring a clean and organized codebase.

---

Feel free to explore and expand upon this example to suit more complex use cases or integrate additional functionalities!

