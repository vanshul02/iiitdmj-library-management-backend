import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role, UserAttributes } from "../../interfaces/User";
import { Student } from "./Student";
import { Staff } from "./Staff";

@Entity()
export class User implements UserAttributes {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Student)
  @JoinColumn()
  student?: Student;

  @OneToOne(() => Staff)
  @JoinColumn()
  staff?: Staff;

  @Column()
  firstName!: string;

  @Column()
  middleName!: string;

  @Column()
  lastName!: string;

  @Column()
  @Index('emailIndex')
  email!: string;

  @Column()
  hashedPassword!: string;

  @Column()
  role!: Role;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}