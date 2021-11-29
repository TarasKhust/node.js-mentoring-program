import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
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

    @ManyToMany(() => UserEntity, (users: UserEntity) => users.groups, {
        nullable: true, cascade: true,  onDelete: 'CASCADE'
    })
    @JoinTable()
        users?: string[];

    @CreateDateColumn()
        createdat!: Date;

    @UpdateDateColumn()
        updatedat!: Date;
}
