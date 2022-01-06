import { UserRepository } from './user.repository';

export default class UserFakeRepository implements UserRepository {
    add(user: UserRepository): Promise<UserRepository> {
        return Promise.resolve({} as UserRepository);
    }

    getUserByLogin(login: string): Promise<UserRepository|null> {
        return Promise.resolve({} as UserRepository);
    }
    getUsers(login?: string, limit?: number): Promise<UserRepository[]> {
        return Promise.resolve([]);
    }
    getUserById(id: string): Promise<UserRepository|null> {
        return Promise.resolve({} as UserRepository);
    }
    update(user: UserRepository): Promise<UserRepository> {
        return Promise.resolve({} as UserRepository);
    }
    remove(id: string): Promise<UserRepository> {
        return Promise.resolve({} as UserRepository);
    }
}
