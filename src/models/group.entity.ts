import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { UserEntity } from './user.entity';


@Entity('groups', {
    orderBy: {
        name: 'ASC',
        id: 'DESC'
    }
})
export class GroupEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
        id!: string;

    @Column()
        name!: string;

    @Column('text', { array: true, nullable: true })
        permissions!: String[];


    @OneToMany(() => UserEntity, (users: UserEntity) => users.groups, {
        nullable: true, onUpdate:'CASCADE', cascade: true
    })
        users?: UserEntity[];

    @CreateDateColumn()
        createdat!: Date;

    @UpdateDateColumn()
        updatedat!: Date;
}
