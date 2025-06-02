import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('empresas')
export class Empresa {
  @PrimaryColumn()
  codigo: string;

  @Column()
  cnpj_cpf: string;

  @Column()
  ie_rg: string;

  @Column()
  razao_nome: string;

  @Column()
  fantasia_apelido: string;

  @Column()
  cep: string;

  @Column()
  pais: string;

  @Column()
  uf: string;

  @Column()
  cidade: string;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column()
  bairro: string;

  @Column()
  complemento: string;

  @Column()
  fone1: string;

  @Column()
  fone2: string;

  @Column()
  email: string;

  @Column('int')
  regime_estadual: number;

  @Column('int')
  regime_federal: number;
}
