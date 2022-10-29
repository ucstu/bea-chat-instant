import { client } from "@/apis";

export default function setApiClientToken(token?: string | undefined) {
  client.default.httpRequest.config.TOKEN = token;
  client.service.httpRequest.config.TOKEN = token;
}
