import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum BlogState {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
}
@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imageKey: string;

  @Column({ default: BlogState.PENDING })
  state: BlogState;
}
