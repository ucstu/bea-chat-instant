import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
  /*
   * 消息ID
   */
  @PrimaryGeneratedColumn()
  msgID: string;
  /**
   * 发送者ID
   */
  @Column()
  senderID: boolean;
  /**
   * 接收者ID
   */
  @Column()
  receiverID: boolean;
  /**
   * 消息内容
   */
  @Column()
  content: string;
  /**
   * 发送时间
   */
  @Column()
  dateTime: string;
  /**
   * 消息类型
   */
  @Column()
  msgType: number;
  /**
   * 已读状态
   */
  @Column()
  readied: boolean;
}
