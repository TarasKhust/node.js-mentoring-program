import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
      id!: string;

  @Column({ type: 'text', default: '' })
      login!: string;

  @Column({ type: 'text', default: '' })
      password!: string;

  @Column({ type: 'text', default: '' })
      age!: string;

  @Column({ type: 'text', default: '' })
      isDeleted!: boolean;

  @CreateDateColumn()
      createdAt!: Date;

  @UpdateDateColumn()
      updatedAt!: Date;
}
