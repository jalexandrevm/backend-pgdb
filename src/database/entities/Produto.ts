import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('produtos')
export class Produto {
  @PrimaryColumn()
  codigo: string;

  @Column()
  descricao: string;

  @Column()
  preco: string;
}
