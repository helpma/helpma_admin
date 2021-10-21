import {usePost} from './common';
import {AuthToken, LoginRequest, UpdateFCMTokenRequest, UpdatePasswordRequest} from '../../types';

export const useLogin = () =>
  usePost<AuthToken, LoginRequest>('/auth/login', 'POST');

export const useUpdatePassword = () =>
  usePost<any, UpdatePasswordRequest>('/auth/change-password');

export const useUpdateFCMToken = () =>
  usePost<any, UpdateFCMTokenRequest>('/user/fcm-token', 'PATCH');
