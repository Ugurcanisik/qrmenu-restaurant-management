import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Product } from '../../products/entities/product.entity'

@Entity('Category')
export class Category {
    
    @PrimaryGeneratedColumn("uuid")
    @OneToMany(type => Product, product => product.categoryid)
    id: string

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false})
    name: string;
    
    @Column({ type: 'int', width: 5, default: 0})
    order: number;

    @Column({ type: 'boolean', default: true})
    isactive: boolean;

    @Column({ type: 'boolean', default: false })
    deleted: boolean
}
