import { CustomEntity } from '@common/decorators/custom-entity.decorator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@CustomEntity(User.name)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30, name: 'name' })
  name: string;

  @Column('text', { name: 'user_name' })
  username: string;

  @Column({ type: 'varchar', length: 40, name: 'email', unique: true })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column({ type: 'text', nullable: true, name: 'passwo' })
  passwords: string;
}
