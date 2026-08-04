import { api } from "./api";



export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (dto) => ({
        url: "/auth/register",
        method: "POST",
        body: dto,
      }),
    }),
    verify:builder.mutation({
        query:(dto) => ({
      url:"auth/verify-otp",
      method:"post",
      body:dto,
       }),
    }),
    login:builder.mutation({
        query:(data)=>({
            url:"auth/login",
            method:"post",
            body:data,
        }),
        
    }),
    getProfile: builder.query({
  query: () => "/user/profile",
  providesTags: ["Profile"],
}),
  }),
});

export const { useRegisterMutation,useVerifyMutation ,useLoginMutation ,useGetProfileQuery} = authApi;