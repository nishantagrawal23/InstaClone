import { api } from "./api";
// import { Post } from "../types/post";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/post/getallPost",
      providesTags: ["Posts"],
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
