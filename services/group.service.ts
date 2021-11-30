import { DeleteResult, getConnection, UpdateResult } from 'typeorm';
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


    async updateGroupById(group: GroupEntity, groupId: string): Promise<GroupEntity | UpdateResult> {
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


        // @ts-ignore
        const usersByIds = await this.userRepository.findByIds(group.users);

        // @ts-ignore
        const checkIfUserExist = groupById.users?.filter(x => usersByIds.some(y => x.id === y.id))[0];

        if (checkIfUserExist) {
            // @ts-ignore
            return;
        }
        // @ts-ignore
        groupById.users.push(usersByIds);

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
