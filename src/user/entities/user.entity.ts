import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './../../role/entities/role.entity';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    passowrd: string;

    @Column({ nullable: false, unique: true })
    username: string;

    @ManyToOne(() => Role, {
        eager: true,
    })
    @JoinColumn()
    role: number;

    @Column({ nullable: true })
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
