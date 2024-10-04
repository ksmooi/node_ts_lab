// src/demo/signal_slot/order_system/main.ts

import { connect } from '../../../modules/signal_slot';
import { 
    OrderService, 
    PaymentService, 
    InventoryService, 
    NotificationService, 
    LoggerService 
} from './services';

function testOrderProcessingSystem() {
    const orderService = new OrderService();
    const paymentService = new PaymentService();
    const inventoryService = new InventoryService();
    const notificationService = new NotificationService();
    const loggerService = new LoggerService();
    
    // Connect the 'orderPlaced' signal to PaymentService's method
    connect({
        sender: orderService,
        signal: 'orderPlaced',
        receiver: paymentService,
        slot: 'processPayment'
    });
    
    // Connect the 'orderPlaced' signal to InventoryService's method
    connect({
        sender: orderService,
        signal: 'orderPlaced',
        receiver: inventoryService,
        slot: 'updateInventory'
    });
    
    // Connect the 'orderPlaced' signal to NotificationService's method
    connect({
        sender: orderService,
        signal: 'orderPlaced',
        receiver: notificationService,
        slot: 'notifyUser' // Method will handle the 'placed' status internally
    });
    
    // Connect the 'orderPlaced' signal to LoggerService's method
    connect({
        sender: orderService,
        signal: 'orderPlaced',
        receiver: loggerService,
        slot: 'logOrder' // Method will handle the 'placed' status internally
    });

    // Connect the 'orderCanceled' signal to PaymentService's refund method
    connect({
        sender: orderService,
        signal: 'orderCanceled',
        receiver: paymentService,
        slot: 'refundPayment'
    });

    // Connect the 'orderCanceled' signal to InventoryService's restock method
    connect({
        sender: orderService,
        signal: 'orderCanceled',
        receiver: inventoryService,
        slot: 'restockInventory'
    });

    // Connect the 'orderCanceled' signal to NotificationService's cancellation method
    connect({
        sender: orderService,
        signal: 'orderCanceled',
        receiver: notificationService,
        slot: 'notifyUser' // Method will handle the 'canceled' status internally
    });

    // Connect the 'orderCanceled' signal to LoggerService's cancellation log method
    connect({
        sender: orderService,
        signal: 'orderCanceled',
        receiver: loggerService,
        slot: 'logOrder' // Method will handle the 'canceled' status internally
    });
    
    // Simulate placing orders and capturing orderIds
    const order1 = orderService.placeOrder(101, 'Laptop', 1, 1500);
    const order2 = orderService.placeOrder(102, 'Smartphone', 2, 800);

    // Simulate canceling an order after a delay
    setTimeout(() => {
        orderService.cancelOrder(order1.orderId); // Use the captured orderId
    }, 2000); // Cancel order 1 after 2 seconds
}

testOrderProcessingSystem();
