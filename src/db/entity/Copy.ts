import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, AfterInsert, AfterUpdate } from "typeorm"
import { Book } from "./Book";
import { CopyAttributes } from "../../interfaces/Copy";
import { IssueHistory } from "./IssueHistory";
import { User } from "./User";
import { AppDataSource } from "../DataSource";


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

  @AfterInsert()
  async updateNumOfCopiesAfterInsert() {
    const book = await this.book;
    if (book) {
      const copyRepository = AppDataSource.getRepository(Copy);
      const bookRepository = AppDataSource.getRepository(Book);
      const count = await copyRepository.count({
        where: {
          book: {
            id: book.id
          }
        }
      });
      book.numOfCopies = count + 1;
      await bookRepository.save(book);
    }
  }

  @AfterUpdate()
  async updateNumOfCopiesAfterUpdate() {
    const book = await this.book;
    if (book) {
      const copyRepository = AppDataSource.getRepository(Copy);
      const bookRepository = AppDataSource.getRepository(Book);
      const count = await copyRepository.count({
        where: {
          book: {
            id: book.id
          }
        }
      });
      book.numOfCopies = count;
      await bookRepository.save(book);
    }
  }
}