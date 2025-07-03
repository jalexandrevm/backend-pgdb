import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from './Produto';

@Entity('produtos_auxiliares')
export class ProdutoAuxiliar {
  @PrimaryColumn({ length: 20 })
  codigoAuxiliar: string;

  @Column({ length: 14 })
  codigoProduto: string;

  @ManyToOne(() => Produto, produto => produto.codigo)
  @JoinColumn({ name: 'codigoProduto', referencedColumnName: 'codigo' })
  produto: Produto;

  @Column('decimal', { precision: 10, scale: 3, default: 1 })
  fatorMultiplo: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  precoAuxiliar: number;
}
