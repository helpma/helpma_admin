import {ShownUser} from './user';

export interface ChatMessage {
  id: string;
  sender: ShownUser;
  message: string;
  messageType: string;
  createdAt?: string;
}

export interface Inbox {
  id: string;
  lastMessage: ChatMessage;
  isRead: boolean;
}

export interface SendChatRequest {
  message: string;
  messageType: string;
  roomId: string;
}

export interface CreateInboxRequest {
  userId: string;
}
