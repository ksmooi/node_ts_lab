import * as express from 'express';
import { Request, Response } from 'express';

// Initialize the express app
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World! Welcome to the Node.js with TypeScript app!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
