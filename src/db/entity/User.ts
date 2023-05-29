import { BeforeInsert, Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Role, UserAttributes } from "../../interfaces/User";
import { Student } from "./Student";
import { Staff } from "./Staff";
import * as bcrypt from 'bcryptjs';

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

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastName!: string;

  @Column({unique: true})
  @Index('emailIndex')
  email!: string;

  @Column()
  password!: string;

  @Column()
  role!: Role;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Hash password before saving to database
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  // ? Validate password
  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }


}