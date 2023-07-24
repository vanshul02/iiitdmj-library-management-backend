import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, ManyToOne, ViewColumn } from "typeorm"
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
  category!: Category;

  @OneToMany(() => Copy, (copy) => copy.book)
  copies?: Copy[]

  @OneToMany(() => IssueHistory, (IssueHistory) => IssueHistory.book)
  issueHistory?: IssueHistory[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: 0 })
  numOfCopies!: number;

  get timesIssued(): number {
    return this.issueHistory?.length ?? 0
  };

  get numOfCopiesIssued(): number {
    return this.copies?.filter(copy => copy.isIssued).length ?? 0
  };
}
