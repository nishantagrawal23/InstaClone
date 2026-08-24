import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('otp')
export class OtpEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  email!: string;

  @Column()
  otp!: string;

  @Column({
    type: 'timestamp',
  })
  expiresAt!: Date;

  @Column({
    default: false,
  })
  isUsed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}