import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Copy } from "./Copy";
import { Book } from "./Book";
import { Student } from "./Student";
import { IssueHistoryAttributes } from "../../interfaces/IssueHistory";

@Entity()
export class IssueHistory implements IssueHistoryAttributes {
  @PrimaryGeneratedColumn()
  id !: number;

  @ManyToOne(() => Copy, (copy) => copy.issue_history)
  @JoinColumn({ name: 'copy_id' })
  copy!: Copy;

  @ManyToOne(() => Book, (book) => book.issue_history)
  @JoinColumn({ name: 'book_id' })
  book!: Book;

  @ManyToOne(() => Student, (student) => student.issue_history)
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @Column({ default: 0 })
  fine_amount?: number;

  @Column()
  fine_clearing_date?: Date;

  @Column()
  fine_posting_dt?: Date;

  @Column()
  issued_date!: Date;

  @Column()
  return_date?: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

}