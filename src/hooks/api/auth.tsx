import {usePost} from './common';
import {AuthToken, LoginRequest, UpdatePasswordRequest} from '../../types';

export const useLogin = () =>
  usePost<AuthToken, LoginRequest>('/auth/login', 'POST');

export const useUpdatePassword = () =>
  usePost<any, UpdatePasswordRequest>('/auth/change-password');
