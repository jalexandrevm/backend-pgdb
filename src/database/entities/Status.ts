import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('status')
export class Status {
  @PrimaryColumn()
  codigo: string;

  @Column()
  nome: string;

  @Column()
  ordem: string;

  @Column()
  cor: string;
}
