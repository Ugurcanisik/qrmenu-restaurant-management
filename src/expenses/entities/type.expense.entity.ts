import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Expense } from '../entities/expense.entity';

@Entity('TypeExpense')
export class TypeExpense {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany((type) => Expense, (expense) => expense.typeexpense)
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
