import type { commentInterface } from "../Types/comment";
import { api } from "./api";


export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all comments of a post
    getComments: builder.query<commentInterface[], string>({
      query: (postId) => ({
        url: `/comment/${postId}`,
        method: "GET",
      }),

      providesTags: (_result, _error, postId) => [
        { type: "Comments", id: postId },
      ],
    }),

    // Create a new comment
    createComment: builder.mutation<
      commentInterface,
      {
        postId: string;
        text: string;
        parentCommentId?: string;
      }
    >({
      query: ({ postId, ...body }) => ({
        url: `/comment/${postId}`,
        method: "POST",
        body,
      }),

      invalidatesTags: (_result, _error, { postId }) => [
        { type: "Comments", id: postId },
        { type: "Posts" }, // Refresh comment count on the feed
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
} = commentApi;