import { DeleteResult, getConnection, UpdateResult } from 'typeorm';
import { User } from '../models';
import { UserRepository } from '../repository/user.repository';

export class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = getConnection('default').getCustomRepository(UserRepository);
    }


    async createUser(user: User): Promise<User | boolean> {
        const { id } = user;

        const getUserById = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if (getUserById) {
            return false;
        }


        const createUser = await this.userRepository.create(user);

        return this.userRepository.save(createUser);
    }


    async getUserById(userId: string) {
        return this.userRepository.findOne({
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
