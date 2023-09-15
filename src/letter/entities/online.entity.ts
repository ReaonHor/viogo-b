import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Online {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.online)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ default: false })
  isOnline: boolean;

  @Column({ default: "" })
  socketid: string;
}
