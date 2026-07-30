import { api } from "./api";

export const likeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        toggleLike: builder.mutation<
            { liked: boolean; likesCount: number },
            string
        >({
            query: (postId) => ({
                url: `/like/${postId}`,
                method: "POST",
            }),

            invalidatesTags: ["Posts"],
        }),
    }),
});

export const { useToggleLikeMutation } = likeApi;