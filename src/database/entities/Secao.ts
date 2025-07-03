import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { SubDepartamento } from "./SubDepartamento";
import { Departamento } from "./Departamento";

@Entity('secoes')
export class Secao {
  @PrimaryColumn({ length: 2 })
  codigo: string;

  @Column()
  descricao: string;

  @OneToMany(() => Departamento, dep => dep.codigoSecaoDep)
  departamentos: Departamento[];

  @OneToMany(() => SubDepartamento, sub => sub.codigoSecaoSubD)
  subdepartamentos: SubDepartamento[];
}
