import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings.js";

export class SendMessageDto{

@IsUUID()
receiverId!:string;


@IsString()
@IsNotEmpty()
message!:string;
}