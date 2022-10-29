import { UserInfo } from "@/entities/UserInfo";
import { HttpResponse } from "@/models/HttpResponse";
import { ContactService } from "@/services/ContactService";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";

@Controller("/contacts")
@UseGuards(AuthGuard("jwt"))
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async addContact(
    @Req() request: Request & { user: UserInfo },
    @Body() contactInfo: UserInfo,
    @Res({ passthrough: true }) res: Response
  ): Promise<HttpResponse> {
    const result = await this.contactService.addContact(
      request.user,
      contactInfo
    );
    if ("code" in result) {
      res.status(Math.floor(result.code / 100));
    }
    return result;
  }

  @Delete(":contactID")
  async removeContact(
    @Req() request: Request & { user: UserInfo },
    @Param() contactID: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<HttpResponse> {
    const result = await this.contactService.removeContact(
      request.user,
      contactID
    );
    if ("code" in result) {
      res.status(Math.floor(result.code / 100));
    }
    return result;
  }

  @Put(":contactID")
  async updateContact(
    @Req() request: Request & { user: UserInfo },
    @Param() contactID: string,
    @Body() userInfo: UserInfo,
    @Res({ passthrough: true }) res: Response
  ): Promise<HttpResponse> {
    const result = await this.contactService.updateContact(
      request.user,
      contactID,
      userInfo
    );
    if ("code" in result) {
      res.status(Math.floor(result.code / 100));
    }
    return result;
  }

  @Get()
  async getContacts(
    @Req() request: Request & { user: UserInfo },
    @Res({ passthrough: true }) res: Response
  ): Promise<UserInfo[] | HttpResponse> {
    const result = await this.contactService.getContacts(request.user);
    if ("code" in result) {
      res.status(Math.floor(result.code / 100));
    }
    return result;
  }

  @Get(":contactID")
  async getContact(
    @Req() request: Request & { user: UserInfo },
    @Param() contactID: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<UserInfo | HttpResponse> {
    const result = await this.contactService.getContact(
      request.user,
      contactID
    );
    if ("code" in result) {
      res.status(Math.floor(result.code / 100));
    }
    return result;
  }
}
