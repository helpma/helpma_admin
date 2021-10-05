import {ShownUser} from './user';

export enum PREGNANCY_CHECK_STATUS {
  WAITING = 'WAITING',
  ATTENDED = 'ATTENDED',
  NOT_ATTENDED = 'NOT_ATTENDED',
}

export interface PregnancyCheck {
  id: string;
  date: string;
  status: PREGNANCY_CHECK_STATUS;
  checkAction?: PregnancyCheckAction;
}

export interface PregnancyCheckAction {
  id: string;
  action: string;
  reason: string;
  recordPlaceLatitude: number;
  recordPlaceLongitude: number;
  recordPlaceAddress?: string;
  createdBy: ShownUser;
}

export interface UserPregnancyCheckSummary {
  user: ShownUser;
  totalCheckSchedule: number;
  totalAttendedSchedule: number;
  totalNotAttendedSchedule: number;
}

export interface UserPregnancyCheckDetail {
  user: ShownUser;
  checkDates: PregnancyCheck[];
}

export interface AddPregnancyCheckRequest {
  userId: string;
  date: string;
}

export interface UpdatePregnancyCheckRequest {
  checkDate?: string;
  status?: PREGNANCY_CHECK_STATUS;
}

export interface CreatePregnancyCheckAction {
  pregnancyCheckId: string;
  action: string;
  recordPlaceLatitude: number;
  recordPlaceLongitude: number;
  reason: string;
}
