import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Secao } from "./Secao";
import { Departamento } from "./Departamento";

@Entity('subdepartamentos')
export class SubDepartamento {
  @PrimaryColumn({ length: 2 })
  codigoSecaoSubD: string;

  @ManyToOne(() => Secao, sec => sec.codigo, { nullable: false })
  @JoinColumn({ name: 'codigoSecaoSubD', referencedColumnName: 'codigo' })
  secao: Secao;

  @PrimaryColumn({ length: 3 })
  codigoDepartamentoSubD: string;

  @ManyToOne(() => Departamento, { nullable: false })
  @JoinColumn([
    { name: 'codigoSecaoSubD', referencedColumnName: 'codigoSecaoDep' },
    { name: 'codigoDepartamentoSubD', referencedColumnName: 'codigo' }
  ])
  departamento: Departamento;

  @PrimaryColumn({ length: 3 })
  codigo: string;

  @Column()
  descricao: string;
}
