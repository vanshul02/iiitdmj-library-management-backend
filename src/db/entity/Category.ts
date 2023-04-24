import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm"

export type CategoryAttributes = {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

@Entity()
export class Category implements CategoryAttributes {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

}
