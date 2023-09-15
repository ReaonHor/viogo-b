/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  message: string;

  @Column()
  sender: string;

  @Column()
  recever: string;

  @CreateDateColumn({ type: "timestamp" })
  createTime: Date;
}
