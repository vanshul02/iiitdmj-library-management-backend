import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Copy } from "./Copy";
import { Book } from "./Book";
import { Student } from "./Student";
import { IssueHistoryAttributes } from "../../interfaces/IssueHistory";
import { User } from "./User";

@Entity()
export class IssueHistory implements IssueHistoryAttributes {
  @PrimaryGeneratedColumn()
  id !: number;

  @ManyToOne(() => Copy, (copy) => copy.issueHistory)
  copy!: Copy;

  @ManyToOne(() => Book, (book) => book.issueHistory)
  book!: Book;

  @ManyToOne(() => User, (user) => user.issueHistory)
  issuedBy!: User;

  @Column({ default: 0 })
  fineAmount?: number;

  @Column({ nullable: true })
  fineClearingDate?: Date;

  @Column({ nullable: true })
  finePostingDate?: Date;

  @Column()
  dueDate!: Date;

  @Column()
  issuedDate!: Date;

  @Column({ nullable: true })
  returnDate?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}