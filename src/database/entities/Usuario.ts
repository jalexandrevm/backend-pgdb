import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity('usuarios')
@Unique(['nome', 'apelido', 'email'])
export class Usuario {
  @PrimaryColumn({ length: 6 })
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
