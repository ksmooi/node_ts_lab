import { User } from './userService';

class EmailService {
    sendWelcomeEmail(user: User) {
        console.log(`EmailService: Sending welcome email to ${user.email}`);
        // Implement actual email sending logic here (e.g., using nodemailer)
    }
}

export { EmailService };
