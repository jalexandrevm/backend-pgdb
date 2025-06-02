import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './Category';

@Entity('videos')
export class Video {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor(id: string, name: string, description: string, duration: number, category_id: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category_id = category_id;
    this.duration = duration;
    this.created_at = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    this.updated_at = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  }
}
