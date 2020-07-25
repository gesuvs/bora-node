import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'qr_code',
})
export class QRCode {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid',
  })
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  code: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    name: 'expire_at',
  })
  expireAt: Date;

  @Column({
    type: 'integer',
    default: 4,
  })
  scale: number;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
  })
  updatedAt: Date;
}
