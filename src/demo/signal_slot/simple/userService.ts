import { create, emit } from '../../../modules/signal_slot';

interface User {
    id: number;
    name: string;
    email: string;
}

class UserService {
    private users: User[] = [];
    private nextId: number = 1;

    constructor() {
        // Initialize the 'userRegistered' signal
        create(this, 'userRegistered');
    }

    registerUser(name: string, email: string) {
        const user: User = { id: this.nextId++, name, email };
        this.users.push(user);
        console.log(`UserService: Registered user ${user.name}`);

        // Emit the 'userRegistered' signal with the new user
        emit(this, 'userRegistered', user);
    }

    // Additional user-related methods can be added here
}

export { UserService, User };
