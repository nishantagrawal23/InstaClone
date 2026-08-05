export interface Conversation {
  id: string;
  lastMessage: string;
  lastMessageAt: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}