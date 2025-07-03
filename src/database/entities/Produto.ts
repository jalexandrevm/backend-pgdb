import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Secao } from './Secao';
import { Departamento } from './Departamento';
import { SubDepartamento } from './SubDepartamento';
import { ProdutoAuxiliar } from './ProdutoAuxiliar';

@Entity('produtos')
export class Produto {
  @PrimaryColumn({ length: 14 })
  codigo: string;

  @Column()
  descricao: string;

  @Column({ length: 3, default: 'UN' })
  unidade: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  precoVenda: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  maxDesconto: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  precoCusto: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  margem: number;

  @Column({ length: 1, default: 'P' })
  tipoProduto: string; // 'P' para produto, 'S' para serviço

  // Secao é obrigatório
  @Column({ length: 2, nullable: false })
  codigoSecao: string;

  @ManyToOne(() => Secao, secao => secao.codigo)
  @JoinColumn({
    name: 'codigoSecao',
    referencedColumnName: 'codigo'
  })
  secao: Secao;

  // Departamento é opcional, precisa de chave composta
  @Column({ length: 3, nullable: true })
  codigoDepartamento?: string;

  @ManyToOne(() => Departamento, { nullable: true })
  @JoinColumn([
    { name: 'codigoSecao', referencedColumnName: 'codigoSecaoDep' },
    { name: 'codigoDepartamento', referencedColumnName: 'codigo' }
  ])
  departamento?: Departamento;

  // SubDepartamento é opcional, precisa de chave composta
  @Column({ length: 3, nullable: true })
  codigoSubDepartamento?: string;

  @ManyToOne(() => SubDepartamento, { nullable: true })
  @JoinColumn([
    { name: 'codigoSecao', referencedColumnName: 'codigoSecaoSubD' },
    { name: 'codigoDepartamento', referencedColumnName: 'codigoDepartamentoSubD' },
    { name: 'codigoSubDepartamento', referencedColumnName: 'codigo' }
  ])
  subDepartamento?: SubDepartamento;

  @OneToMany(() => ProdutoAuxiliar, produtoAuxiliar => produtoAuxiliar.codigoProduto)
  auxiliares: ProdutoAuxiliar[];
}
