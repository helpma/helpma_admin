export interface ApiError {
  target?: string;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  statusCode: number;
  errors?: ApiError[];
}

export interface ListData<T> {
  list: T[];
  total: number;
}

export interface DataTableParam {
  pageSize?: number;
  page?: number;
  query?: string;
}
