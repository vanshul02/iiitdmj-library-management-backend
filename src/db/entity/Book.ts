import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, ManyToOne } from "typeorm"
import { Category } from "./Category";
import { BookAttributes } from "../../interfaces/Book";
import { Copy } from "./Copy";
import { IssueHistory } from "./IssueHistory";

@Entity()
export class Book implements BookAttributes {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  summary?: string;

  @Column()
  author?: string;

  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @OneToMany(() => Copy, (copy) => copy.book)
  copies?: Copy[]

  @OneToMany(() => IssueHistory, (IssueHistory) => IssueHistory.book)
  issue_history?: IssueHistory[];

  @Column({ default: 0 })
  times_issued!: number;

  @Column({ default: 0 })
  num_of_copies!: number;

  @Column({ default: 0 })
  num_of_copies_issued!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

}
