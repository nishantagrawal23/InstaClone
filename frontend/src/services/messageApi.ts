// src/redux/services/messageApi.ts

import { api } from "./api";
import type { Message } from "../Types/message";

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], string>({
      query: (conversationId) =>
        `/chat/messages/${conversationId}`,

      // providesTags: ["Message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
} = messageApi;