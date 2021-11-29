import { DeleteResult, getConnection } from 'typeorm';
import { GroupEntity } from '../models/group.entity';
import { GroupRepository } from '../repository/group.repository';
import { UserRepository } from '../repository/user.repository';

export class GroupService {
    private groupRepository: GroupRepository;
    private userRepository: UserRepository;
    constructor() {
        this.groupRepository = getConnection('default').getCustomRepository(GroupRepository);
        this.userRepository = getConnection('default').getCustomRepository(UserRepository);
    }


    async createGroup(group: GroupEntity): Promise<GroupEntity | boolean> {
        const createGroup = await this.groupRepository.create(group);

        console.log(createGroup);

        return await this.groupRepository.save(createGroup);
    }


    async getGroupById(groupId: string) {
        return await this.groupRepository.findOne({
            where: {
                id: groupId
            },
            relations: ['users']
        });
    }


    async updateGroupById(group: GroupEntity, id: string): Promise<GroupEntity> {
        const groupById = await this.groupRepository.findOneOrFail({
            where: {
                id
            },
            relations: ['users']
        });

        console.log(group.users);

        // @ts-ignore
        const userById = await this.userRepository.findByIds(group.users);

        // const ola = group.users?.filter(() => )

        console.log(userById);


        // @ts-ignore
        groupById.users.push(userById);

        // console.log(groupById);


        return await this.groupRepository.save({ ...group, ...groupById });
    }

    async deleteGroupById(id: string): Promise<DeleteResult> {
        return await this.groupRepository.delete(id);
    }

    async getGroups(): Promise<GroupEntity[]> {
        return await this.groupRepository.find({
            relations: ['users']
        });
    }
}
