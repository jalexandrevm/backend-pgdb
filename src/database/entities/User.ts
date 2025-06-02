import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Generated, PrimaryColumn } from "typeorm"

@Entity()
export class User {

  // @PrimaryGeneratedColumn({ type: "int" })
  // @Generated("increment")
  @PrimaryColumn({ type: "int" })
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  age: number

  // @CreateDateColumn()
  // created_at: Date;

  constructor(id: number, firstName: string, lastName: string, age: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    // this.created_at = new Date();
  }
}
