import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity('status')
export class Status {
  @PrimaryColumn({ length: 3 })
  @Unique(['nome'])
  codigo: string;

  @Column()
  nome: string;

  @Column('int')
  ordem: number;

  @Column({ nullable: true })
  cor?: string;
}
