import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class CustomerEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name: string;

  @Column()
  age: Number;

  @Column()
  gender: string;

}