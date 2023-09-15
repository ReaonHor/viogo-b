/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne } from "typeorm";
import { Article } from "./article.entity";
import { Online } from "src/letter/entities/online.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column({ select: false })
	password: string;

	@Column({ nullable: true })
	nickname: string;

	@Column({ nullable: true, default: 'unlogin.jpeg' })
	avatar: string;

	@Column({
		length: 120,
		nullable: true
	})
	signature: string;

	@OneToOne(() => Online)
	online: Online

	@OneToMany(() => Article, (article) => article.user)
	articles: Article[]

	@CreateDateColumn()
	createTime: Date;
}
