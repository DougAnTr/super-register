import { add, format } from "date-fns";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("verificationCodes")
export class VerificationCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ name: "expiration_date" })
  expirationDate: string;

  @Column()
  userId: number;

  @BeforeInsert()
  createExpirationDate() {
    this.expirationDate = format(
      add(new Date(), { hours: 1 }),
      "yyyy-MM-dd HH:mm:ss"
    );
  }
}
