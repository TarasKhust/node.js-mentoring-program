import { DeleteResult, getConnection, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

export class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = getConnection('default').getCustomRepository(UserRepository);
    }


    async createUser(user: User): Promise<User | boolean> {
        const createUser = await this.userRepository.create(user);

        return await this.userRepository.save(createUser);
    }


    async getUserById(userId: string) {
        return await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
    }

    async updateUserById(user: User, id: string): Promise<UpdateResult> {
        return await this.userRepository.update(id, user);
    }

    async deleteUserById(id: string): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }
}
