import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Status } from './Status';

@Entity('situacoes')
export class Situacao {
  @PrimaryColumn({ length: 3 })
  codigoStatus: string;

  @ManyToOne(() => Status, status => status.codigo)
  @JoinColumn({ name: 'codigoStatus', referencedColumnName: 'codigo' })
  status: Status;

  @PrimaryColumn({ length: 3 })
  codigo: string;

  @Column()
  nome: string;

  @Column('int')
  ordem: number;

  @Column({ nullable: true })
  cor?: string;
}
