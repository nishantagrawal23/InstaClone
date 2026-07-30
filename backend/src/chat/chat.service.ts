import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConversationEntity } from "./entity/Conversation.entity";
import { ConversationMemberEntity } from "./entity/conversation-member.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { SendMessageDto } from "./dto/send-message.dto";
import { MessageEntity } from "./entity/message.entity";



@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ConversationEntity)
        private readonly conversationRepository: Repository<ConversationEntity>,

        @InjectRepository(ConversationMemberEntity)
        private readonly conversationMemberRepository: Repository<ConversationMemberEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>
    ) { }

    async createConversation(
        senderId: string,
        receiverId: string,
    ) {
        if (senderId === receiverId) {
            throw new BadRequestException(
                'You cannot create a conversation with yourself.',
            );
        }

        const sender = await this.userRepository.findOne({
            where: { id: senderId },
        });

        if (!sender) {
            throw new NotFoundException('Sender not found.');
        }
       

        const receiver = await this.userRepository.findOne({
            where: { id: receiverId },
        });
        console.log("receiverId:", receiverId)

        if (!receiver) {
            throw new NotFoundException('Receiver not found.');
        }

        // agar If a conversation already exists, we simply return it.

        const existingConversation = await this.conversationRepository

            .createQueryBuilder('conversation')
           
            // ye coversation aur conerversationMember table jo connect krr raha isse memberid ke sath conversation id bhi aa rhi hai 
            .leftJoin('conversation.members', 'member')
   

            // conversation se type check kr raha hai 
            .where('conversation.type = :type', {
                type: 'DIRECT',
            })

            .andWhere('member.userId IN (:...userIds)', {    // :... this is used  to expan the array in (1,2)
                userIds: [senderId, receiverId],
            })
            .groupBy('conversation.id')

            .having('COUNT(DISTINCT member.userId) = 2')   // 2bnde hi log baat krr rhe hai vo laa do
           
            .getOne();

        if (existingConversation) {
            return existingConversation;
        }


        // aur agar nhi mili to we will create the conversation (prr isme sifr type aa raha hai )

        const conversation = this.conversationRepository.create({
            type: 'DIRECT',
        });

        await this.conversationRepository.save(conversation);


        const senderMember = this.conversationMemberRepository.create({
            conversation,
            user: sender,
        });

        const receiverMember = this.conversationMemberRepository.create({
            conversation,
            user: receiver,
        });

        await this.conversationMemberRepository.save([
            senderMember,
            receiverMember,
        ]);

        // aur yaha return krr diya 
        return conversation;
    }

    async sendMessage(
        senderId: string,
        dto: SendMessageDto,
    ) {
        const conversation = await this.createConversation(
            senderId,
            dto.receiverId,
        );

        const sender = await this.userRepository.findOne({
            where: {
                id: senderId,
            },
        });

        if (!sender) {
            throw new NotFoundException('Sender not found');
        }

        const newMessage = this.messageRepository.create({
            conversation,
            sender,
            message: dto.message,
        });

        const savedMessage = await this.messageRepository.save(
            newMessage,
        );

        conversation.lastMessage = savedMessage.message;
        conversation.lastMessageAt = new Date();

        await this.conversationRepository.save(
            conversation,
        );

        return savedMessage;
    }


}