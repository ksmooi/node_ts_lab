// npx ts-node src/demo/signal_slot/simple/main.ts

import { connect } from '../../../modules/signal_slot';
import { UserService } from './userService';
import { EmailService } from './emailService';
import { LoggerService } from './loggerService';

function runSignalSlotSimpleDemo() {
    // Instantiate the services
    const userService = new UserService();
    const emailService = new EmailService();
    const loggerService = new LoggerService();

    // Connect the 'userRegistered' signal to EmailService's sendWelcomeEmail method
    connect({
        sender: userService,
        signal: 'userRegistered',
        receiver: emailService,
        slot: 'sendWelcomeEmail'
    });

    // Connect the 'userRegistered' signal to LoggerService's logRegistration method
    connect({
        sender: userService,
        signal: 'userRegistered',
        receiver: loggerService,
        slot: 'logRegistration'
    });

    // Register a new user
    userService.registerUser('Alice', 'alice@example.com');

    // Register another user
    userService.registerUser('Bob', 'bob@example.com');
}

runSignalSlotSimpleDemo();
