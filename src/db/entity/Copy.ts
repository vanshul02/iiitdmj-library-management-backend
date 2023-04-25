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
  @JoinColumn({ name: 'book_id' })
  book!: Book;

  @OneToMany(() => IssueHistory, (IssueHistory) => IssueHistory.copy)
  issue_history?: IssueHistory[];

  @Column({ default: false })
  is_issued!: boolean;

  @ManyToOne(() => Student, (student) => student.issued_copies)
  @JoinColumn({ name: 'issued_by' })
  issued_by?: Student;

  @Column()
  issued_at?: Date;

  @Column()
  due_date?: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}