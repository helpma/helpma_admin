import {FieldError} from 'react-hook-form';
import {ApiError} from '../types';

export const GenerateFormError = (error?: FieldError): string => {
  if (!error) {
    return '';
  }
  let errorMsg: string | undefined = '';
  if (error.type === 'required') {
    errorMsg = 'Field ini tidak boleh kosong';
  } else {
    errorMsg = error.message;
  }

  return errorMsg || 'Terjadi kesalahan';
};

export const GetApiErrorByKey = (
  key: string,
  errors?: ApiError[],
): string | undefined => {
  if (!errors || !errors.length) {
    return '';
  }

  return errors.find(err => err.target === key)?.message;
};

const localMonths: string[] = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const formatLocalDate = (dateStr: string | undefined): string => {
  if (!dateStr) {
    return '';
  }

  const date = new Date(dateStr);

  return `${String(date.getDate()).padStart(2, '0')} ${
    localMonths[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const formatLocalDateTime = (dateStr: string | undefined): string => {
  if (!dateStr) {
    return '';
  }

  const date = new Date(dateStr);

  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')} - ${String(date.getDate()).padStart(2, '0')} ${
    localMonths[date.getMonth()]
  } ${date.getFullYear()}`;
};

export function calculateAge(birthdayStr: string) {
  const birthday = new Date(birthdayStr);
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
