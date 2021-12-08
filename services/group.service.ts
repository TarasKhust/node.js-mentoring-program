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


    async addUsersToGroup(groupId: string, userIds: String[]): Promise<any> {
        // @ts-ignore
        const groupById = await this.groupRepository.findOneOrFail({
            where: {
                id: groupId
            },
            relations: ['users']
        });


        // @ts-ignore
        const usersByIds = await this.userRepository.findByIds(userIds.users);


        // @ts-ignore
        const checkIfUserNotExists = usersByIds?.filter(x => !groupById.users.some(y => x.id === y.id))[0];


        // @ts-ignore
        if (checkIfUserNotExists) {
            // @ts-ignore
            groupById.users.push(checkIfUserNotExists);
        }

        return await this.groupRepository.save({ ...groupById });
    }


    async updateGroupById(group: GroupEntity, groupId: string): Promise<any> {
        if (!group?.users) {
            return await this.groupRepository.update({
                id: groupId
            }, {
                ...group
            });
        }


        const groupById = await this.groupRepository.findOneOrFail({
            where: {
                id: groupId
            },
            relations: ['users']
        });


        const usersByIds = await this.userRepository.findByIds(group.users);


        // @ts-ignore
        const checkIfUserNotExists = usersByIds?.filter(x => !groupById.users.some(y => x.id === y.id))[0];


        if (checkIfUserNotExists) {
            // @ts-ignore
            groupById.users.push(checkIfUserNotExists);
        }


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
