import {BroadcastNotifRequest} from '../../types';
import {usePost} from './common';

export const useBroadcastNotif = () =>
  usePost<any, BroadcastNotifRequest>('/notification/broadcast', 'POST');
