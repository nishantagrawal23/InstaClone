export interface PostImage {
  url: string;
  publicId: string;
}

export interface PostInterface {
  post_caption: string | null;
  post_images: PostImage[];

  post_id: string;
  post_createdAt: string;

  user_name: string;
  user_username: string;

  likeCount: string;
  commentCount: string;
}


