import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "user_info" })
export class UserInfo {
  /*
   * 用户ID
   */
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
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
  @Exclude()
  password: string;
  /*
   * 联系人
   */
  @Exclude()
  @JoinTable({
    name: "user_info_contacts_user_info",
    joinColumns: [{ name: "user_id_1" }],
    inverseJoinColumns: [{ name: "user_id_2" }],
  })
  @ManyToMany(() => UserInfo)
  contacts: UserInfo[];
}
