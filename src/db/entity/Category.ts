import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { CategoryAttributes } from "../../interfaces/Category";
import { Book } from "./Book";

@Entity()
export class Category implements CategoryAttributes {

    constructor(name: string) {
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @OneToMany(() => Book, (book) => book.category)
    books ?: Book[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}
