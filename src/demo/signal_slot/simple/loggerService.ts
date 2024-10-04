import { User } from './userService';

class LoggerService {
    logRegistration(user: User) {
        console.log(`LoggerService: User ${user.name} with email ${user.email} has registered.`);
        // Implement actual logging logic here (e.g., writing to a log file or external logging service)
    }
}

export { LoggerService };
