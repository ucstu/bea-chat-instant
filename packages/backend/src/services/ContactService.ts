import { UserInfo } from "@/entities/UserInfo";
import { HttpResponse } from "@/models/HttpResponse";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOperator, Repository } from "typeorm";

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(UserInfo)
    private usersRepository: Repository<UserInfo>
  ) {}

  async addContact(userInfo: UserInfo, contactInfo: UserInfo) {
    userInfo = await this.usersRepository.findOne({
      where: { userID: new FindOperator("equal", userInfo.userID) },
    });
    if (!userInfo) return new HttpResponse(40003, "您的账号已被注销");
    try {
      await this.usersRepository.query(
        `INSERT INTO user_info_contacts_user_info VALUES($1,$2);`,
        [userInfo.userID, contactInfo.userID]
      );
      await this.usersRepository.query(
        `INSERT INTO user_info_contacts_user_info VALUES($1,$2);`,
        [contactInfo.userID, userInfo.userID]
      );
      return new HttpResponse(20001, "添加成功");
    } catch (error) {
      return new HttpResponse(50001, "已经添加过了");
    }
  }

  async removeContact(userInfo: UserInfo, contactID: UserInfo["userID"]) {
    userInfo = await this.usersRepository.findOne({
      where: { userID: new FindOperator("equal", userInfo.userID) },
    });
    if (!userInfo) return new HttpResponse(40003, "您的账号已被注销");
    userInfo.contacts = userInfo.contacts.filter(
      (userInfo) => userInfo.userID !== contactID
    );
    await this.usersRepository.save(userInfo);
    return new HttpResponse(20000, "删除成功");
  }

  async updateContact(
    userInfo: UserInfo,
    contactID: UserInfo["userID"],
    contactInfo: UserInfo
  ) {
    userInfo = await this.usersRepository.findOne({
      where: { userID: new FindOperator("equal", userInfo.userID) },
    });
    if (!userInfo) return new HttpResponse(40003, "您的账号已被注销");
    userInfo.contacts = userInfo.contacts.map((userInfo) =>
      userInfo.userID === contactID ? contactInfo : userInfo
    );
    await this.usersRepository.save(userInfo);
    return new HttpResponse(20000, "更新成功");
  }

  async getContacts(userInfo: UserInfo) {
    userInfo = await this.usersRepository.findOne({
      where: { userID: new FindOperator("equal", userInfo.userID) },
    });
    if (!userInfo) return new HttpResponse(40003, "您的账号已被注销");
    const contacts = await this.usersRepository.query(
      "select user_id as userID, name, avatar from user_info,user_info_contacts_user_info where user_info_contacts_user_info.user_id_1 = $1 or user_info_contacts_user_info.user_id_2 = $1",
      [userInfo.userID]
    );
    return contacts.map((userInfo) => ({
      ...userInfo,
      userID: userInfo.userid,
    })) as Array<UserInfo>;
  }

  async getContact(userInfo: UserInfo, contactID: UserInfo["userID"]) {
    userInfo = await this.usersRepository.findOne({
      where: { userID: new FindOperator("equal", userInfo.userID) },
    });
    if (!userInfo) return new HttpResponse(40003, "您的账号已被注销");
    const contactInfo = userInfo.contacts.find(
      (contactInfo) => contactInfo.userID === contactID
    );
    return contactInfo
      ? contactInfo
      : new HttpResponse(40004, "该联系人已被删除");
  }
}
