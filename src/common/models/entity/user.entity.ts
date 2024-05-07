import { CustomEntity } from '@common/decorators/custom-entity.decorator';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';

@CustomEntity(User.name)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column('text')
  username: string;

  @Column({ type: 'varchar', length: 40, unique: true, nullable: false })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'text', nullable: true })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({
    name: 'role',
  })
  role: Role | number;
}
