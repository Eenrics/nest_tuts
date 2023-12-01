import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity('coffees') // sql table === 'coffees'
@Entity() // sql table === 'coffee'
export class Coffee {
    @PrimaryGeneratedColumn() // this decorator defines id and auto increments it
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column('json', { nullable: true })
    flavors: string[];
}