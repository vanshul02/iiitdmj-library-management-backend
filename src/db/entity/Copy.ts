import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Book } from "./Book";
import { CopyAttributes } from "../../interfaces/Copy";
import { Student } from "./Student";
import { IssueHistory } from "./IssueHistory";
import { User } from "./User";


@Entity()
export class Copy implements CopyAttributes {

  constructor() {
    this.isIssued = false;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Book, (book) => book.copies)
  book!: Book;

  @OneToMany(() => IssueHistory, (IssueHistory) => IssueHistory.copy)
  issueHistory?: IssueHistory[];

  @Column({ default: false })
  isIssued!: boolean;

  @ManyToOne(() => User, (user) => user.issuedCopies)
  issuedBy?: User;

  @Column({ nullable : true })
  issuedAt?: Date;

  @Column({ nullable : true })
  dueDate?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}