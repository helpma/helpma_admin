import {useGet, usePost} from './common';
import {
  ChatMessage,
  CreateInboxRequest,
  Inbox,
  ListData,
  SendChatRequest,
  ShownUser,
} from '../../types';
import {useMemo} from 'react';

export const useGetMyInbox = () =>
  useGet<ListData<Inbox>, any>(
    '/chat/inbox/list',
    useMemo(
      () => ({
        page: 0,
        pageSize: 50,
      }),
      [],
    ),
  );

export const useGetInboxMessages = (inboxId: string) =>
  useGet<ListData<ChatMessage>, any>(
    `/chat/inbox/${inboxId}`,
    useMemo(
      () => ({
        page: 0,
        pageSize: 200,
      }),
      [],
    ),
  );

export const useCreateInbox = () =>
  usePost<Inbox, CreateInboxRequest>('/chat/inbox', 'POST');

export const useSendChat = () =>
  usePost<any, SendChatRequest>('/chat/send', 'POST');

export const useGetChatPartnerInfo = (userId: string) =>
  useGet<ShownUser, any>(`/user/admin/${userId}`);
