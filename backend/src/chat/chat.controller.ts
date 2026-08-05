import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common";
import { type Request } from "express";

import { ChatService } from "./chat.service";
import { JwtGaurd } from "src/auth/Jwt.auth.guard";

@Controller("chat")
@UseGuards(JwtGaurd)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get("conversations")
  getConversations(@Req() req: Request) {
      const user = req.user as { id: string };
    return this.chatService.getConversations(user["id"]);
  }

  @Get("messages/:conversationId")
  getMessages(@Param("conversationId") conversationId: string) {
    return this.chatService.getMessages(conversationId);
  }
}