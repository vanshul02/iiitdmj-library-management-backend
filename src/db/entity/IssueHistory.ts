import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Copy } from "./Copy";
import { Book } from "./Book";
import { Student } from "./Student";
import { IssueHistoryAttributes } from "../../interfaces/IssueHistory";

@Entity()
export class IssueHistory implements IssueHistoryAttributes {
  @PrimaryGeneratedColumn()
  id !: number;

  @ManyToOne(() => Copy, (copy) => copy.issueHistory)
  copy!: Copy;

  @ManyToOne(() => Book, (book) => book.issueHistory)
  book!: Book;

  @ManyToOne(() => Student, (student) => student.issueHistory)
  student!: Student;

  @Column({ default: 0 })
  fineAmount?: number;

  @Column()
  fineClearingDate?: Date;

  @Column()
  finePostingDate?: Date;

  @Column()
  issuedDate!: Date;

  @Column()
  returnDate?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}