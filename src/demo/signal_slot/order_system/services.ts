import { create, emit } from '../../../modules/signal_slot';

interface Order {
    orderId: number;
    userId: number;
    product: string;
    quantity: number;
    amount: number;
}

export class OrderService {
    private orders: Order[] = [];
    private nextOrderId: number = 1;

    constructor() {
        // Initialize the 'orderPlaced' and 'orderCanceled' signals
        create(this, 'orderPlaced');
        create(this, 'orderCanceled');
    }

    placeOrder(userId: number, product: string, quantity: number, amount: number): Order {
        const order: Order = {
            orderId: this.nextOrderId++,
            userId,
            product,
            quantity,
            amount
        };
        this.orders.push(order);
        console.log(`OrderService: Placed order ${order.orderId} for user ${order.userId}`);

        // Emit the 'orderPlaced' signal with the new order
        emit(this, 'orderPlaced', order);

        return order; // Return the created order
    }

    cancelOrder(orderId: number) {
        const orderIndex = this.orders.findIndex(order => order.orderId === orderId);
        if (orderIndex === -1) {
            console.log(`OrderService: Order ${orderId} not found.`);
            return;
        }

        const [order] = this.orders.splice(orderIndex, 1);
        console.log(`OrderService: Canceled order ${order.orderId} for user ${order.userId}`);

        // Emit the 'orderCanceled' signal with the canceled order
        emit(this, 'orderCanceled', order);
    }

    // Additional order-related methods can be added here
}

export class PaymentService {
    processPayment(order: Order) {
        console.log(`PaymentService: Processing payment for order ${order.orderId}, amount $${order.amount}`);
        // Implement actual payment processing logic here
    }

    refundPayment(order: Order) {
        console.log(`PaymentService: Refunding payment for order ${order.orderId}, amount $${order.amount}`);
        // Implement actual refund processing logic here
    }
}

export class InventoryService {
    updateInventory(order: Order) {
        console.log(`InventoryService: Updating inventory for product ${order.product}, quantity ${order.quantity}`);
        // Implement actual inventory update logic here
    }

    restockInventory(order: Order) {
        console.log(`InventoryService: Restocking inventory for product ${order.product}, quantity ${order.quantity}`);
        // Implement actual inventory restocking logic here
    }
}

export class NotificationService {
    notifyUser(order: Order, status: 'placed' | 'canceled') {
        if (status === 'placed') {
            console.log(`NotificationService: Notifying user ${order.userId} about order ${order.orderId}`);
            // Implement actual notification logic here (e.g., send email or SMS)
        } else if (status === 'canceled') {
            console.log(`NotificationService: Informing user ${order.userId} about cancellation of order ${order.orderId}`);
            // Implement actual cancellation notification logic here
        }
    }
}

export class LoggerService {
    logOrder(order: Order, status: 'placed' | 'canceled') {
        if (status === 'placed') {
            console.log(`LoggerService: Order ${order.orderId} placed by user ${order.userId} for ${order.quantity} x ${order.product}`);
            // Implement actual logging logic here
        } else if (status === 'canceled') {
            console.log(`LoggerService: Order ${order.orderId} canceled by user ${order.userId}`);
            // Implement actual cancellation logging logic here
        }
    }
}
