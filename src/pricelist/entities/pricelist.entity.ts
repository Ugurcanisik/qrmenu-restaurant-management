import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'


@Entity('Pricelist')
export class Pricelist {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: 'varchar', length: 50, nullable: false})
    name: string;

    @Column({ type: 'varchar', length: 20,  nullable: false})
    price: string;

   
    @Column({ type: 'boolean', default: false })
    deleted: boolean

}












