import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Copy } from "./Copy";
import { StudentAttributes } from "../../interfaces/Student";
import { IssueHistory } from "./IssueHistory";
import { User } from "./User";


@Entity()
export class Student implements StudentAttributes {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.student)
  user!: User;

  @Column({ unique: true })
  rollNumber !: string;

  @OneToMany(() => Copy, (copy) => copy.issuedBy)
  issuedCopies ?: Copy[];

  @OneToMany(() => IssueHistory, (IssueHistory) => IssueHistory.student)
  issueHistory?: IssueHistory[];
}