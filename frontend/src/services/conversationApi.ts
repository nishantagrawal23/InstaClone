// src/redux/services/conversationApi.ts

import { api } from "./api";
import type { Conversation } from "../Types/conversation";

export const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<Conversation[], void>({
      query: () => "/chat/conversations",

      providesTags: ["Conversation"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
} = conversationApi;