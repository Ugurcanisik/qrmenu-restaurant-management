import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity('Ciro')
export class Ciro {
    
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: 'int', width: 15, nullable: false})
    total: number;

    @Column({ type: 'varchar', length: 300,  nullable: true})
    description: string;

    @Column({ type: 'char', length: 100, nullable: false})
    date: string;

    @Column({ type: 'boolean', default: false })
    deleted: boolean
}
