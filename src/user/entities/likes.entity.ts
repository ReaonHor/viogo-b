import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ type: "simple-array", nullable: true })
  support: string[];

  @Column({ type: "simple-array", nullable: true })
  collect: string[];
}
