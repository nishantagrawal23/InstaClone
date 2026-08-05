export interface Message {
  id: string;
  message: string;
  isSeen: boolean;
  createdAt: string;

  sender: {
    id: string;
    name: string;
    username: string;
  };
}