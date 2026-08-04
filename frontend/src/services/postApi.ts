import { api } from "./api";
// import { Post } from "../types/post";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/post/getallPost",
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
  query: (formData: FormData) => ({
    url: "/post/create",
    method: "POST",
    body: formData,
  }),
  invalidatesTags: ["Posts"],
}),
deletePost: builder.mutation({
  query: (postId: string) => ({
    url: `/post/deletepost`,
    method: "DELETE", 
    body:{postId}
  }),
  invalidatesTags: ["Posts"],
}),
getMyPosts: builder.query({
  query: () => "/post/my-posts",
  providesTags: ["Posts","Follow"],
}),
getUserPosts: builder.query({
  query: (userId: string) => `/post/user/${userId}`,
  providesTags: ["Posts","Follow"],
}),
  }),
  
});

export const { useGetPostsQuery ,useCreatePostMutation ,useDeletePostMutation,useGetMyPostsQuery , useGetUserPostsQuery} = postApi;
