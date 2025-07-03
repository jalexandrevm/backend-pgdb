import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Atendimento } from './Atendimento';
import { Tecnico } from './Tecnico';
import { Situacao } from './Situacao';
import { Status } from './Status';

@Entity('atendimento_interacoes')
export class AtendimentoInteracao {
  @PrimaryColumn({ length: 10 })
  codigo: string;

  @Column({ length: 10 })
  codigoAtendimento: string;

  @ManyToOne(() => Atendimento, atendimento => atendimento.codigo)
  @JoinColumn({ name: 'codigoAtendimento', referencedColumnName: 'codigo' })
  atendimento: Atendimento;

  @Column('int')
  posicao: number;

  @Column({ length: 6 })
  codigoTecnico: string;

  @ManyToOne(() => Tecnico, tecnico => tecnico.codigo)
  @JoinColumn({ name: 'codigoTecnico', referencedColumnName: 'codigo' })
  tecnico: Tecnico;

  @Column({ type: 'timestamp' })
  dataInteracao: Date;

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
  ])
  situacao: Situacao;

  @Column()
  textoDescricao: string;
}
