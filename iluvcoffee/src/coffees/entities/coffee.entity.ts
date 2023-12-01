import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";

// @Entity('coffees') // sql table === 'coffees'
@Entity() // sql table === 'coffee'
export class Coffee {
    @PrimaryGeneratedColumn() // this decorator defines id and auto increments it
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    // @Column('json', { nullable: true })
    @JoinTable()
    @ManyToMany(type => Flavor, (flavor) => flavor.coffees)
    flavors: string[];
}