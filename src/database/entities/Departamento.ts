import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Secao } from "./Secao";

@Entity('departamentos')
export class Departamento {
  @PrimaryColumn({ length: 2 })
  codigoSecaoDep: string;

  @ManyToOne(() => Secao, secao => secao.codigo)
  @JoinColumn({ name: 'codigoSecaoDep', referencedColumnName: 'codigo' })
  secao: Secao;

  @PrimaryColumn({ length: 3 })
  codigo: string;

  @Column()
  descricao: string;
}
