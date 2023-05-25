import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, ManyToOne, ViewColumn } from "typeorm"
import { Category } from "./Category";
import { BookAttributes } from "../../interfaces/Book";
import { Copy } from "./Copy";
import { IssueHistory } from "./IssueHistory";

@Entity()
export class Book implements BookAttributes {

  constructor(name: string, summary: string, author: string, category: Category) {
    this.name = name;
    this.summary = summary;
    this.author = author;
    this.category = category;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  summary?: string;

  @Column()
  author?: string;

  @ManyToOne(() => Category, (category) => category.books)
  category!: Category;

  @OneToMany(() => Copy, (copy) => copy.book)
  copies?: Copy[]

  @OneToMany(() => IssueHistory, (IssueHistory) => IssueHistory.book)
  issueHistory?: IssueHistory[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  timesIssued: number = this.issueHistory?.length ?? 0;
  numOfCopies: number = this.copies?.length ?? 0;
  numOfCopiesIssued: number = this.copies?.filter(copy => copy.isIssued).length ?? 0;

}
