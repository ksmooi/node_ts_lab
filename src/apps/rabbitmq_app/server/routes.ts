import { Router } from 'express';
import Controller from './controller';

const router = Router();
const controller = new Controller();

// Publish a message
router.post('/publish', (req, res) => controller.publishMessage(req, res));

// Consume messages
router.post('/consume', (req, res) => controller.consumeMessages(req, res));

// Shutdown RabbitMQ connection
router.post('/shutdown', (req, res) => controller.shutdown(req, res));

export default router;
