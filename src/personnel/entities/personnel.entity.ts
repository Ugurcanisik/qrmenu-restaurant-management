import { Expense } from 'src/expenses/entities/expense.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'


@Entity('Personnel')
export class Personnel {
    
    @PrimaryGeneratedColumn("uuid")
    @OneToMany(type => Expense, expense => expense.personnel)
    id: string;

    @Column({ type: 'varchar', length: 200, nullable: false})
    name: string;

    @Column({ type: 'char', length: 100, nullable: false})
    startdate: string;
    
    @Column({ type: 'char', length: 100, nullable: true})
    enddate: string;

    @Column({ type: 'boolean', default: true})
    isactive: boolean;

    @Column({ type: 'boolean', default: false })
    deleted: boolean
}
