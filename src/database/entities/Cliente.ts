import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryColumn({ length: 6 })
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
  sexo: string;
  // 'M' para Masculino, 'F' para Feminino, 'E' para Empresa
}
