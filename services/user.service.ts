import { DeleteResult, getConnection, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserRepository } from '../repository/user.repository';

export class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = getConnection('default').getCustomRepository(UserRepository);
    }


    async createUser(user: UserEntity): Promise<UserEntity | boolean> {
        const createUser = await this.userRepository.create(user);

        return await this.userRepository.save(createUser);
    }


    async getUserById(userId: string) {
        return await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['groups']
        });
    }

    async updateUserById(user: UserEntity, id: string): Promise<UserEntity | undefined> {
        const { affected } = await this.userRepository.update(id, user);

        if ((affected: any) => 1) {
            return this.getUserById(id)
        }
    }

    async deleteUserById(id: string): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    async getUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find({ relations: ['groups'] });
    }
}
