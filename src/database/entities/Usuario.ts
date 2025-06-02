import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryColumn()
  codigo: string;

  @Column()
  nome: string;

  @Column()
  apelido: string;

  @Column()
  senha: string;

  @Column()
  email: string;

  @Column()
  permissao: string;
}
