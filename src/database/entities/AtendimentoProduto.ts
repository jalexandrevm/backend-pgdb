import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Atendimento } from './Atendimento';
import { Usuario } from './Usuario';
import { Produto } from './Produto';
import { ProdutoAuxiliar } from './ProdutoAuxiliar';

@Entity('atendimentos_produtos')
export class AtendimentoProduto {
  @PrimaryColumn({ length: 10 })
  codigo: string;

  @Column({ length: 10 })
  codigoAtendimento: string;

  @ManyToOne(() => Atendimento, atendimento => atendimento.codigo)
  @JoinColumn({ name: 'codigoAtendimento', referencedColumnName: 'codigo' })
  atendimento: Atendimento;

  @Column({ length: 6 })
  codigoUsuario: string;

  @ManyToOne(() => Usuario, usuario => usuario.codigo)
  @JoinColumn({ name: 'codigoUsuario', referencedColumnName: 'codigo' })
  usuario: Usuario;

  @Column({ type: 'timestamp' })
  dataInclusao: Date;

  @Column({ length: 1 })
  tipoProduto: string;
  // 'P' para produto, 'S' para serviço

  @Column('int')
  posicao: number;

  @Column({ length: 14 })
  codigoProduto: string;

  @ManyToOne(() => Produto, produto => produto.codigo)
  @JoinColumn({ name: 'codigoProduto', referencedColumnName: 'codigo' })
  produto: Produto;

  @Column('decimal', { precision: 10, scale: 3 })
  qtd: number;

  @Column({ length: 3 })
  unidade: string;

  @Column('decimal', { precision: 10, scale: 2 })
  vlrUnit: number;

  @Column('decimal', { precision: 10, scale: 2 })
  vlrTotal: number;

  @Column({ length: 20, nullable: true, default: null })
  codigoAuxiliar?: string;

  @ManyToOne(() => ProdutoAuxiliar, prodAuxiliar => prodAuxiliar.codigoAuxiliar, { nullable: true })
  @JoinColumn({ name: 'codigoAuxiliar', referencedColumnName: 'codigoAuxiliar' })
  produtoAuxiliar: ProdutoAuxiliar;

  @Column('decimal', { precision: 10, scale: 2 })
  vlrCusto: number;

  @Column({ type: 'text', nullable: true })
  observacao: string;
}
