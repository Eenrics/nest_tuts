import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// COMBOSITE INDEX
@Index(['name', 'type'])
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    type: string;

    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>;
}
