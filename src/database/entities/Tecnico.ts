import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, Unique } from 'typeorm';
import { Usuario } from './Usuario';

@Entity('tecnicos')
@Unique(['nome'])
export class Tecnico {
  @PrimaryColumn({ length: 6 })
  codigo: string;

  @Column({ length: 6 })
  codigoUsuario: string;

  @OneToOne(() => Usuario, usuario => usuario.codigo)
  @JoinColumn({ name: 'codigoUsuario', referencedColumnName: 'codigo' })
  usuario: Usuario;

  @Column()
  nome: string;

  @Column()
  titulo: string;
}
