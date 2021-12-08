import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { GroupEntity } from './group.entity';

@Entity('users', {
    orderBy: {
        login: 'ASC',
        id: 'DESC'
    }
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
      id!: string;

  @Column({ type: 'text', default: '' })
      login!: string;

  @Column({ type: 'text', default: '' })
      password!: string;

  @Column({ type: 'text', default: '' })
      age!: string;


  @ManyToOne(() => GroupEntity, groups => groups.users, {
      onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true
  })
      groups?: GroupEntity;


  @Column({ type: 'text', default: false })
      isdeleted!: boolean;

  @CreateDateColumn()
      createdat!: Date;

  @UpdateDateColumn()
      updatedat!: Date;
}
