import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { CategoryAttributes } from "../../interfaces/Category";
import { Book } from "./Book";

@Entity()
export class Category implements CategoryAttributes {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @OneToMany(() => Book, (book) => book.category)
    books ?: Book[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

}
