import { CustomEntity } from '@common/decorators/custom-entity.decorator';
import {
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';

@CustomEntity(User.name)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Index()
  @Column('text')
  username: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 40, nullable: false })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Index()
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({
    name: 'role',
  })
  role: Role | number;
}
