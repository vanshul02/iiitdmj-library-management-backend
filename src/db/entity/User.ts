import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role, UserAttributes } from "../../interfaces/User";
import { Student } from "./Student";
import { StaffAttributes } from "../../interfaces/Staff";
import { Staff } from "./Staff";

@Entity()
export class User implements UserAttributes {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Student, (student) => student.user)
  student?: Student;

  @OneToOne(() => Staff, (staff) => staff.user)
  staff?: StaffAttributes;

  @Column()
  first_name!: string;

  @Column()
  middle_name!: string;

  @Column()
  last_name!: string;

  @Column()
  @Index('email_index')
  email!: string;

  @Column()
  hashed_password!: string;

  @Column()
  role!: Role;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

}