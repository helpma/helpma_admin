import {useGet, usePost} from './common';
import {
  AddPregnancyCheckRequest,
  CreatePregnancyCheckAction,
  CreatePregnancyCheckResultRequest,
  DataTableParam,
  ListData,
  PregnancyCheck,
  PregnancyCheckResult,
  UpdatePregnancyCheckRequest,
  UpdatePregnancyCheckResultRequest,
  UserPregnancyCheckDetail,
  UserPregnancyCheckSummary,
} from '../../types';

export const useGetPregnancyCheckList = (param: DataTableParam) =>
  useGet<ListData<UserPregnancyCheckSummary>, DataTableParam>(
    '/pregnancy-information/list',
    param,
  );

export const useGetUserPregnancyCheckDetail = (userId: string) =>
  useGet<UserPregnancyCheckDetail, any>(`/pregnancy-information/${userId}`);

export const useGetPregnancyCheckResult = (pregnancyCheckId: string) =>
  useGet<PregnancyCheckResult, any>(
    `/pregnancy-information/result/${pregnancyCheckId}`,
  );

export const useGetPregnancyCheckDetail = (pregnancyChecyId: string) =>
  useGet<PregnancyCheck, any>(
    `/pregnancy-information/check/${pregnancyChecyId}`,
  );

export const useCancelPregnancyCheckSchedule = (pregnancyCheckId: string) =>
  usePost(`/pregnancy-information/${pregnancyCheckId}`, 'DELETE');

export const useCreatePregnancyCheckResult = () =>
  usePost<CreatePregnancyCheckResultRequest, any>(
    '/pregnancy-information/result',
    'POST',
  );

export const useGetPrengnacyCheckResultDetail = (pregnancyCheckId: string) =>
  useGet<PregnancyCheckResult, any>(
    `/pregnancy-information/result/${pregnancyCheckId}`,
  );

export const useUpdatePregnancyCheckResult = (resultId: string) =>
  usePost<UpdatePregnancyCheckResultRequest, any>(
    `/pregnancy-information/result/${resultId}`,
    'PUT',
  );

export const useAddPregnancyCheckSchedule = () =>
  usePost<any, AddPregnancyCheckRequest>('/pregnancy-information', 'POST');

export const useUpdatePregnancyCheckSchedule = (pregnancyCheckId: string) =>
  usePost<any, UpdatePregnancyCheckRequest>(
    `/pregnancy-information/${pregnancyCheckId}`,
    'PUT',
  );

export const useCreatePregnancyCheckAction = () =>
  usePost<any, CreatePregnancyCheckAction>(
    '/pregnancy-information/action',
    'POST',
  );
