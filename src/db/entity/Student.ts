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
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ unique: true })
  roll_number !: string;

  @OneToMany(() => Copy, (copy) => copy.issued_by)
  issued_copies ?: Copy[];

  @OneToMany(() => IssueHistory, (IssueHistory) => IssueHistory.student)
  issue_history?: IssueHistory[];
}