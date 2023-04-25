import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StaffAttributes } from "../../interfaces/Staff";
import { User } from "./User";

@Entity()
export class Staff implements StaffAttributes {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.staff)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}