import { api } from "./api";

export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (userId: string) => ({
        url: `/follow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Posts"],
    }),

    unfollowUser: builder.mutation({
      query: (userId: string) => ({
        url: `/follow/unfollow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
} = followApi;