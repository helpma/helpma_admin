import {useCallback, useEffect, useState} from 'react';
import {ApiError, ApiResponse} from '../../types';
import axios, {AxiosResponse, Method} from 'axios';
import {navigate} from '../navigation';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_ACCESS_TOKEN_KEY} from '../../constant';

// export const API_BASE_URL = 'http://10.0.2.2:3000/v1';
// export const API_BASE_URL = 'http://192.168.43.248:3000/v1';
export const API_BASE_URL = 'http://139.59.124.13/api/v1';

interface IFetch {
  error: ApiError[] | undefined;
  isLoading: boolean;
}

interface IUseGet<TResponse> extends IFetch {
  data: TResponse | undefined;
  reFetch: () => void;
}

export const useGet = <TResponse, TRequest>(
  endpoint: string,
  params?: TRequest,
): IUseGet<TResponse> => {
  const [data, setData] = useState<TResponse>();
  const [error, setError] = useState<ApiError[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!isFetched) {
      const doFetch = async () => {
        console.log({params})
        try {
          const accessToken = await AsyncStorage.getItem(
            STORAGE_ACCESS_TOKEN_KEY,
          );
          const headers: any = {};
          if (accessToken) {
            headers.Authorization = accessToken;
          }
          const res: AxiosResponse<ApiResponse<TResponse>> = await axios.get(
            `${API_BASE_URL}${endpoint}`,
            {
              params,
              headers,
            },
          );

          if (res.data.statusCode === 401 || res.data.statusCode === 403) {
            Alert.alert(
              'Unauthorized',
              res.data?.errors?.[0]?.message ||
                'Anda tidak memiliki permission untuk mengakses laman ini. Silahkan login kembali dengan akun anda yang benar',
            );
            await AsyncStorage.clear();
            navigate('LoginScreen');
            return;
          }
          if (!!res.data?.errors || !!res.data?.errors?.length) {
            setError(res.data.errors);
          } else {
            if (res.data.data) {
              setData(res.data.data);
            }
          }
          setIsFetched(true);
        } catch (err: any) {
          Alert.alert(
            'Terjadi kesalahan',
            err.message ||
              'Terjadi kesalahan. Silahkan coba beberapa saat lagi',
          );
          setError([
            {
              message: err.message,
            },
          ]);
        }
      };

      setLoading(true);

      doFetch().finally(() => {
        setLoading(false);
      });
    }
  }, [endpoint, params, isFetched]);

  const reFetch = useCallback(() => {
    setIsFetched(false);
  }, []);

  return {
    data,
    error,
    isLoading: loading,
    reFetch,
  };
};

interface IUsePost<TResponse, TRequest> extends IFetch {
  doFetch: (param: TRequest) => Promise<TResponse | undefined>;
}

export const usePost = <TResponse, TRequest>(
  endpoint: string,
  method?: Method,
): IUsePost<TResponse, TRequest> => {
  const [error, setError] = useState<ApiError[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const doFetch = useCallback(
    async (param: TRequest): Promise<TResponse | undefined> => {
      setLoading(true);
      setError(undefined);
      try {
        const accessToken = await AsyncStorage.getItem(
          STORAGE_ACCESS_TOKEN_KEY,
        );
        const res: AxiosResponse<ApiResponse<TResponse>> = await axios(
          `${API_BASE_URL}${endpoint}`,
          {
            method: method || 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: accessToken,
            },
            data: param,
          },
        );

        if (res.data.statusCode === 401 || res.data.statusCode === 403) {
          navigate('LoginScreen');
          throw new Error(
            res.data?.errors?.[0]?.message ||
              'Anda tidak memiliki permission untuk mengakses laman ini. Silahkan login kembali dengan akun anda yang benar',
          );
        }

        if (res.data.data) {
          return res.data.data;
        } else {
          if (!!res.data?.errors || !!res.data.errors?.length) {
            setError(res.data.errors);
            throw new Error(
              res.data.errors?.map(err => err.message).join(', '),
            );
          }
        }
        setLoading(false);
      } catch (err: any) {
        Alert.alert(
          'Terjadi kesalahan',
          err.message || 'Terjadi kesalahan. Silahkan coba beberapa saat lagi',
        );

        setError([
          {
            message: err.message,
          },
        ]);
        setLoading(false);
        throw err;
      }
    },
    [endpoint, method],
  );

  return {
    isLoading: loading,
    error,
    doFetch,
  };
};
