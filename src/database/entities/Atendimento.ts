import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Empresa } from './Empresa';
import { Usuario } from './Usuario';
import { Cliente } from './Cliente';
import { Status } from './Status';
import { Situacao } from './Situacao';
import { AtendimentoInteracao } from './AtendimentoInteracao';
import { AtendimentoProduto } from './AtendimentoProduto';

@Entity('atendimentos')
export class Atendimento {
  @PrimaryColumn({ length: 10 })
  codigo: string;

  @Column({ length: 4 })
  codigoEmpresa: string;

  @ManyToOne(() => Empresa, empresa => empresa.codigo)
  @JoinColumn({ name: 'codigoEmpresa', referencedColumnName: 'codigo' })
  empresa: Empresa;

  @Column({ length: 6 })
  codigoUsuario: string;

  @ManyToOne(() => Usuario, usuario => usuario.codigo)
  @JoinColumn({ name: 'codigoUsuario', referencedColumnName: 'codigo' })
  usuario: Usuario;

  @Column({ length: 6 })
  codigoCliente: string;

  @ManyToOne(() => Cliente, cliente => cliente.codigo)
  @JoinColumn({ name: 'codigoCliente', referencedColumnName: 'codigo' })
  cliente: Cliente;

  @Column({ type: 'timestamp' })
  dataAbertura: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  dataFechamento: Date;

  @Column({ length: 3 })
  codigoStatus: string;

  @ManyToOne(() => Status, status => status.codigo)
  @JoinColumn({ name: 'codigoStatus', referencedColumnName: 'codigo' })
  status: Status;

  @Column({ length: 3 })
  codigoSituacao: string;

  @ManyToOne(() => Situacao)
  @JoinColumn([
    { name: 'codigoStatus', referencedColumnName: 'codigoStatus' },
    { name: 'codigoSituacao', referencedColumnName: 'codigo' }
  ]) situacao: Situacao;

  @Column()
  problemaInformado: string;

  @OneToMany(() => AtendimentoInteracao, interacao => interacao.atendimento)
  interacaoTecnica: AtendimentoInteracao[];

  @OneToMany(() => AtendimentoProduto, produto => produto.atendimento)
  atendeProdutos: AtendimentoProduto[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  valorPecas: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  valorServicos: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  valorDesconto: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  valorAtende: number;
}
