import { api } from "./api";
import type { Conversation } from "../Types/conversation";

interface CreateConversationDto {
  receiverId: string;
}

export const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<Conversation[], void>({
      query: () => "/chat/conversations",
      providesTags: ["Conversation"],
    }),

    createConversation: builder.mutation({
      query: (dto: CreateConversationDto) => ({
        url: "/chat/conversation",
        method: "POST",
        body: dto,
      }),

      invalidatesTags: ["Conversation"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useCreateConversationMutation,
} = conversationApi;