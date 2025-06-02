import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Status } from './Status';

@Entity('situacoes')
export class Situacao {
  @PrimaryColumn()
  codigo: string;

  @Column()
  nome: string;

  @Column()
  ordem: string;

  @Column()
  cor: string;

  @Column()
  status_codigo: string;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_codigo' })
  status: Status;
}
