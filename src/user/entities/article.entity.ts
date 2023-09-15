/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Article {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	username: string;

	@Column({ length: 500 })
	content: string;

	@Column({ default: 0 })
	likes: number;

	@Column({ nullable: true })
	image: string;

	@ManyToOne(() => User, (user) => user.articles)
	@JoinColumn({ name: 'userId' })
	user: User;

	@CreateDateColumn({ type: 'timestamp' })
	createTime: Date;

}
