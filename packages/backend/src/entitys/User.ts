import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  /*
   * 用户ID
   */
  @PrimaryGeneratedColumn()
  userID: string;
  /**
   * 用户名称
   */
  @Column()
  name: string;
  /**
   * 头像地址
   */
  @Column()
  avatar: string;
  /**
   * 登陆密码
   */
  @Column()
  password: string;
}

export type UserType = Omit<User, keyof BaseEntity>;
