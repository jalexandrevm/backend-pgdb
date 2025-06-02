import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tecnicos')
export class Tecnico {
  @PrimaryColumn()
  codigo: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  titulo: string;
}
