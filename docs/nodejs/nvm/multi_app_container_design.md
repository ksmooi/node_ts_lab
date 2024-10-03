# Designing a Containerized System for Multiple Applications

When building modern software systems, it's common to have multiple applications (microservices) interacting with a set of shared backend services such as databases, caches, and message brokers. Docker, combined with Docker Compose, offers an efficient way to containerize, orchestrate, and manage such systems. In this article, we will walk through the design of a containerized system where multiple applications (`app1`, `app2`, and `app3`) depend on shared backend services such as PostgreSQL, MongoDB, Redis, and RabbitMQ. We’ll explain how these components work together, how they communicate, and how you can manage them using Docker Compose.

## Key Design Considerations

When designing a containerized system that involves multiple applications and backend services, the following factors are critical:
1. **Service Isolation**: Each service (e.g., PostgreSQL, Redis) should be isolated from external access but available to the applications that need them.
2. **Application Exposure**: Applications need to be externally accessible, but only expose the necessary services or endpoints.
3. **Internal Communication**: Applications should communicate with the backend services via an internal Docker network, ensuring security and reducing external exposure.
4. **Service Sharing**: Backend services (e.g., databases) should be shared by multiple applications to avoid redundancy and optimize resource usage.


## Design Overview

We will design a system where:
- **Backend services** (PostgreSQL, MongoDB, Redis, RabbitMQ) are isolated and not exposed externally.
- **Applications** (`app1`, `app2`, `app3`) interact with these backend services and are exposed externally to handle user interactions, APIs, or background tasks.
- Communication between applications and backend services will occur through a **shared internal network**.

## Component Breakdown

### 1. **Backend Services**
These are shared services that provide core functionality for the applications:
- **PostgreSQL**: A relational database used for structured data.
- **MongoDB**: A NoSQL database used for unstructured or semi-structured data.
- **Redis**: An in-memory data store used for caching and fast data retrieval.
- **RabbitMQ**: A message broker that facilitates communication between microservices.

### 2. **Applications** (`app1`, `app2`, `app3`)
These applications interact with the backend services for various tasks. Each application serves a different purpose:
- **app1**: Could be a web application that interacts with users and performs CRUD operations on the PostgreSQL database.
- **app2**: Could be a background worker that processes messages from RabbitMQ.
- **app3**: Could be a service that interacts with MongoDB for analytics.


## System Architecture

The architecture of the system can be broken down into the following key parts:

### **Internal Docker Network**
- All backend services and applications communicate internally using a **shared Docker network**.
- This network ensures that services like PostgreSQL and MongoDB are only accessible to the applications that need them, without exposing these services to external networks.

### **External Exposure for Applications**
- Applications (`app1`, `app2`, `app3`) expose specific ports to the host machine, allowing users and external systems to access them. For example, `app1` might be accessible via a web interface, while `app2` might expose an API.

### **Service-to-Service Communication**
- Applications communicate with the backend services using service names (e.g., `postgres`, `mongodb`) provided by Docker Compose. This is facilitated by Docker’s internal DNS, which resolves these names to the correct container IP addresses.


## Docker Compose Setup

To implement this design, we will use **three Docker Compose files**:
1. One for the **shared backend services**.
2. One for each of the **applications** (`app1`, `app2`, and `app3`).

### 1. `services-compose.yml` (Backend Services)

The backend services are defined here. These services are not exposed externally and communicate with the applications via an internal Docker network.

```yaml
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: appdb
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - app-network
    # No ports defined, making PostgreSQL accessible only internally

  mongodb:
    image: mongo:5
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network
    # No ports defined, making MongoDB accessible only internally

  redis:
    image: redis:7
    networks:
      - app-network
    # No ports defined, making Redis accessible only internally

  rabbitmq:
    image: rabbitmq:management
    networks:
      - app-network
    # No ports defined, making RabbitMQ accessible only internally

volumes:
  pgdata:
  mongo-data:

networks:
  app-network:
    driver: bridge
```

**Explanation**:
- **PostgreSQL**, **MongoDB**, **Redis**, and **RabbitMQ** are all defined here without the `ports` directive. This means they are not accessible from the host machine or external networks.
- These services are connected to the `app-network`, which allows internal communication with the applications.

### 2. `app1-compose.yml` (Application 1)

This defines `app1`, a web application that interacts with the backend services (e.g., PostgreSQL and Redis). The application exposes port `8080` to allow external access.

```yaml
services:
  app1:
    image: app1_image
    environment:
      DATABASE_URL: postgres://user:password@postgres/appdb
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    ports:
      - "8080:8080"  # Expose app1 on port 8080 for external access
    networks:
      - app-network

networks:
  app-network:
    external: true
```

**Explanation**:
- **app1** connects to PostgreSQL and Redis using their service names (`postgres` and `redis`) via the shared `app-network`.
- It exposes port `8080` to allow external access for users or other systems.

### 3. `app2-compose.yml` (Application 2)

This defines `app2`, which might be a background service interacting with RabbitMQ.

```yaml
services:
  app2:
    image: app2_image
    environment:
      RABBITMQ_URL: amqp://rabbitmq:5672
    depends_on:
      - rabbitmq
    networks:
      - app-network

networks:
  app-network:
    external: true
```

**Explanation**:
- **app2** interacts with RabbitMQ, using the `RABBITMQ_URL` to connect to the message broker.
- It uses the `app-network` for internal communication but does not expose any ports to the external network.

### 4. `app3-compose.yml` (Application 3)

This defines `app3`, which interacts with MongoDB for analytics processing.

```yaml
services:
  app3:
    image: app3_image
    environment:
      MONGO_URL: mongodb://mongodb:27017
    depends_on:
      - mongodb
    ports:
      - "8082:8080"  # Expose app3 on port 8082 for external access
    networks:
      - app-network

networks:
  app-network:
    external: true
```

**Explanation**:
- **app3** interacts with MongoDB, connecting internally using the service name `mongodb`.
- It exposes port `8082` to allow external access for analytics or API users.


## Managing and Running the System

To manage this system, you will run the shared services first, followed by the applications.

### Step 1: Start Shared Services (Backend)
```bash
docker-compose -f services-compose.yml up -d
```
This command starts the shared backend services (PostgreSQL, MongoDB, Redis, RabbitMQ).

### Step 2: Start Applications
For each application, use the corresponding Docker Compose file:

```bash
docker-compose -f app1-compose.yml up -d
docker-compose -f app2-compose.yml up -d
docker-compose -f app3-compose.yml up -d
```

Each application will start and connect to the necessary backend services via the internal network (`app-network`).



## Communication Flow

1. **app1**: A user sends a request to `http://localhost:8080`, which `app1` processes. `app1` interacts with PostgreSQL and Redis internally to retrieve and cache data.
   
2. **app2**: Background tasks are processed by `app2`, which listens to messages from RabbitMQ.

3. **app3**: External systems or users access `http://localhost:8082` to interact with `app3`, which performs analytics on data stored in MongoDB.



## Security Considerations

1. **Internal Services**: PostgreSQL, MongoDB, Redis, and RabbitMQ are not exposed to the external network, ensuring that they are only accessible by the applications.

2. **External Exposure**: Only the necessary applications are exposed externally, with each application defining its own public-facing ports. You should ensure proper security measures (such as authentication and HTTPS) are in place for externally accessible applications.



## Conclusion

By containerizing backend services and multiple applications using Docker Compose, you can efficiently manage communication, security, and scalability. The **shared internal network** allows for seamless interaction between services while isolating backend systems from external exposure. This design is flexible and scalable, enabling the easy addition of more applications or services in the future.

Using separate Compose files for shared services and individual applications improves clarity, modularity, and maintenance. This system architecture is suitable for a variety of use cases, from small microservice deployments to larger, more complex systems.

Let me know if you need more information or further clarification on any of these steps! ✔️

