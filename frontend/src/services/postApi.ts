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
  }),
  
});

export const { useGetPostsQuery ,useCreatePostMutation ,useDeletePostMutation} = postApi;
