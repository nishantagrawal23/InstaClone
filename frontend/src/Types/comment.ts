 export interface commentInterface{
    id: string;
  text: string;
  createdAt: string;

  user_name: string;
  user_username: string;

  isOwner: boolean;

  replies: commentInterface[];
 }