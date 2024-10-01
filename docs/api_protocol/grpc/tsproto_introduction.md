# An In-Depth Introduction to `ts-proto` with Examples

## What is `ts-proto`?

`ts-proto` is a library designed to generate TypeScript types and gRPC service stubs from Protocol Buffer (`.proto`) files. Unlike other Protobuf-to-TS tools, `ts-proto` offers a highly type-safe and idiomatic TypeScript experience, making it easier to work with Protobuf in the TypeScript ecosystem.

When developing microservices or any backend-to-frontend communication systems, Protocol Buffers (`protobuf`) are often used due to their performance and efficiency. However, converting these `.proto` files into usable TypeScript code can be cumbersome. `ts-proto` helps in solving this by generating well-typed TypeScript code for both the client and server components.

## Why Use `ts-proto`?

- **Type Safety**: `ts-proto` generates TypeScript definitions with full typing, ensuring that your client and server interactions are type-safe.
- **Idiomatic TypeScript**: Instead of generating non-TypeScript-friendly classes or objects, `ts-proto` produces idiomatic TypeScript code (e.g., using `interfaces` and `type` definitions).
- **Compatibility with gRPC and REST**: You can use `ts-proto` in both gRPC and REST API environments.
- **Supports `optional` fields**: Handles optional fields introduced in protobuf `proto3`.

## Setting up `ts-proto`

To begin, install the necessary dependencies:

```bash
npm install ts-proto @grpc/grpc-js @grpc/proto-loader
```

You’ll also need the `protoc` compiler installed on your machine.

## Example Protobuf Definition

Let’s start with a simple `.proto` file that contains various data types and repeated fields:

```proto
syntax = "proto3";

package user;

message Address {
  string street = 1;
  string city = 2;
  string state = 3;
}

message UserProfile {
  string id = 1;
  string name = 2;
  int32 age = 3;
  Address address = 4;
  repeated string phoneNumbers = 5;
  optional string email = 6;
}

service UserService {
  rpc GetUserProfile (UserRequest) returns (UserProfile);
  rpc CreateUserProfile (UserProfile) returns (UserResponse);
}

message UserRequest {
  string id = 1;
}

message UserResponse {
  bool success = 1;
  string message = 2;
}
```

This `.proto` file defines:
- `UserProfile` with fields of various types, including a `repeated` field.
- A `UserService` with two RPC methods (`GetUserProfile` and `CreateUserProfile`).

## Generating TypeScript with `ts-proto`

To generate TypeScript from the `.proto` file, you’ll need to use the `protoc` compiler with the `ts-proto` plugin:

```bash
protoc \
  --plugin=protoc-gen-ts_proto=node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=src/generated \
  --ts_proto_opt=outputServices=grpc-js,useOptionals=messages,esModuleInterop=true,forceLong=string \
  src/proto/user.proto
```

This command generates TypeScript code in the `./src/generated` folder. Key options like `useOptionals=true` are passed to support optional fields.

## Generated TypeScript Code Overview

Once you run the `protoc` command, `ts-proto` will generate TypeScript types and gRPC client/server definitions. Let's go over the key parts:

### 1. **Types for Messages**

`ts-proto` converts your Protobuf messages into TypeScript interfaces. For example, the `UserProfile` message becomes:

```typescript
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  address?: Address;
  phoneNumbers: string[];
  email?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
}
```

- **Optional fields**: Fields like `email` are optional, as defined in the `.proto` file.
- **Repeated fields**: `phoneNumbers` is typed as `string[]`, which reflects the `repeated string` definition.

### 2. **gRPC Service Definitions**

`ts-proto` generates TypeScript interfaces for the gRPC service, like `UserService`. For the server-side:

```typescript
export interface UserService {
  GetUserProfile(
    request: DeepPartial<UserRequest>,
    metadata?: grpc.Metadata
  ): Promise<UserProfile>;

  CreateUserProfile(
    request: DeepPartial<UserProfile>,
    metadata?: grpc.Metadata
  ): Promise<UserResponse>;
}
```

- **Server-side API**: This interface is used to define the server-side gRPC handlers. You’ll implement these methods in your gRPC server.

For the client-side, `ts-proto` generates gRPC service stubs like this:

```typescript
export class UserServiceClientImpl {
  constructor(private readonly rpc: Rpc) {}

  GetUserProfile(
    request: DeepPartial<UserRequest>,
    metadata?: grpc.Metadata
  ): Promise<UserProfile> {
    return this.rpc.unary(UserServiceGetUserProfileDesc, request, metadata);
  }

  CreateUserProfile(
    request: DeepPartial<UserProfile>,
    metadata?: grpc.Metadata
  ): Promise<UserResponse> {
    return this.rpc.unary(UserServiceCreateUserProfileDesc, request, metadata);
  }
}
```

- **Client-side API**: This class can be used by the client to invoke RPC methods on the `UserService`.

## Example: Implementing Server Component

To create the server-side gRPC service, you would implement the `UserService` interface generated by `ts-proto`:

```typescript
import { UserService, UserProfile, UserRequest, UserResponse } from './generated/user';
import { Server, ServerCredentials } from '@grpc/grpc-js';

const users: UserProfile[] = [
  { id: "1", name: "Alice", age: 30, phoneNumbers: ["123456789"], email: "alice@example.com" },
  { id: "2", name: "Bob", age: 25, phoneNumbers: ["987654321"], email: "bob@example.com" },
];

const userServiceImpl: UserService = {
  async GetUserProfile(request: UserRequest): Promise<UserProfile> {
    const user = users.find((user) => user.id === request.id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async CreateUserProfile(profile: UserProfile): Promise<UserResponse> {
    users.push(profile);
    return { success: true, message: "User created successfully" };
  },
};

const server = new Server();
server.addService(UserServiceService, userServiceImpl);
server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
  console.log('gRPC server is running on port 50051');
  server.start();
});
```

In this example:
- We maintain a simple in-memory user database (`users`).
- We implement both `GetUserProfile` and `CreateUserProfile` methods.
- The gRPC server is created and listens on port `50051`.

## Example: Client Component

On the client side, you would invoke the RPC methods using the `UserServiceClientImpl`:

```typescript
import { UserServiceClientImpl, UserRequest } from './generated/user';
import { GrpcWebImpl } from '@improbable-eng/grpc-web';

const client = new UserServiceClientImpl(new GrpcWebImpl('http://localhost:50051', {}));

async function fetchUserProfile(userId: string) {
  const request: UserRequest = { id: userId };
  const response = await client.GetUserProfile(request);
  console.log("User Profile:", response);
}

async function createUserProfile() {
  const newUser = {
    id: "3",
    name: "Charlie",
    age: 28,
    phoneNumbers: ["123123123"],
  };
  const response = await client.CreateUserProfile(newUser);
  console.log("Create Response:", response);
}

// Fetch a user profile
fetchUserProfile("1");

// Create a new user profile
createUserProfile();
```

In this example:
- The `GrpcWebImpl` from `@improbable-eng/grpc-web` is used to enable communication between the client and server over gRPC-web.
- We make calls to both `GetUserProfile` and `CreateUserProfile`.

## Conclusion

`ts-proto` is a powerful tool for generating fully-typed TypeScript code from `.proto` files. It supports various protobuf features like repeated fields, optional fields, and nested messages. By providing idiomatic TypeScript interfaces and gRPC service stubs, `ts-proto` enables developers to work in a type-safe manner across both client and server.

Whether you're building microservices or need efficient communication between your TypeScript services, `ts-proto` ensures that your code remains strongly typed and easy to maintain.

