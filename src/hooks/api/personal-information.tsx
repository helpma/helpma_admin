import {useGet} from './common';
import {DataTableParam, ListData, UserPersonalInformation} from '../../types';

export const useGetPersonalInformationList = (param: DataTableParam) =>
  useGet<ListData<UserPersonalInformation>, DataTableParam>(
    '/personal-information/list',
    param,
  );

export const useGetPersonalInformationDetail = (id: string) =>
  useGet<UserPersonalInformation, any>(`/personal-information/${id}`);

export const useGetMyPersonalInformation = () =>
  useGet<UserPersonalInformation, any>('/personal-information');
