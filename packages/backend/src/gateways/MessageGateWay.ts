import { Message } from "@/entities/Message";
import { UserInfo } from "@/entities/UserInfo";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor(protected readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    try {
      const userInfo = this.jwtService.verify(
        client.handshake.auth.token
      ) as UserInfo;
      client.handshake.auth.userID = userInfo.userID;
      return true;
    } catch (error) {
      return false;
    }
  }
}

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
@UseGuards(JwtWsGuard)
export class MessageGateWay {
  constructor(protected readonly jwtService: JwtService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("msg")
  async findAll(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: Message
  ) {
    (await this.server.sockets.fetchSockets())
      .find((client) => {
        if (!client.handshake.auth.userID) {
          client.handshake.auth.userID = (
            this.jwtService.verify(client.handshake.auth.token) as UserInfo
          ).userID;
        }
        return client.handshake.auth.userID === message.receiverID;
      })
      ?.emit("msg", { ...message, senderID: client.handshake.auth.userID });
  }
}
