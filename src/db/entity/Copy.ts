import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Book } from "./Book";
import { CopyAttributes } from "../../interfaces/Copy";
import { Student } from "./Student";
import { IssueHistory } from "./IssueHistory";


@Entity()
export class Copy implements CopyAttributes {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Book, (book) => book.copies)
  book!: Book;

  @OneToMany(() => IssueHistory, (IssueHistory) => IssueHistory.copy)
  issueHistory?: IssueHistory[];

  @Column({ default: false })
  isIssued!: boolean;

  @ManyToOne(() => Student, (student) => student.issuedCopies)
  issuedBy?: Student;

  @Column()
  issuedAt?: Date;

  @Column()
  dueDate?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}