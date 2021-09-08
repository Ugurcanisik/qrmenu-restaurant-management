import { Personnel } from 'src/personnel/entities/personnel.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { TypeExpense } from '../entities/type.expense.entity'


@Entity('Expense')
export class Expense {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => TypeExpense, expense => expense.id)
    typeexpense: TypeExpense[];

    @Column({ type: 'varchar', length: 200, nullable: true})
    description: string;

    @ManyToOne(type => Personnel, personnel => personnel.id)
    personnel: Personnel[];

    @Column({ type: 'int', width: 15, nullable: false})
    total: number;

    @Column({ type: 'char', length: 100, nullable: false})
    date: string;

    @Column({ type: 'boolean', default: false })
    deleted: boolean
}
