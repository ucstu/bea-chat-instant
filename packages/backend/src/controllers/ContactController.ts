import { Controller, Get, SetMetadata, UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/duard";
import { ContactService } from "../services/ContactService";

@Controller()
@UseGuards(RolesGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @SetMetadata("roles", ["admin"])
  getHello(): string {
    return this.contactService.getHello();
  }
}
