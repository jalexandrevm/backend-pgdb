import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('empresas')
export class Empresa {
  @PrimaryColumn({ length: 4 })
  codigo: string;

  @Column({ length: 14 })
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

  @Column({ length: 1 })
  regime_estadual: string;
  // 'S' para Simples Nacional, 'N' para Normal

  @Column({ length: 1 })
  regime_federal: string;
  // 'S' para Simples Nacional, 'R' para Real, 'P' para Presumido
}
