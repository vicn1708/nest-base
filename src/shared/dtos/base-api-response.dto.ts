import { Expose } from 'class-transformer';

export class BaseApi {
  @Expose()
  error: boolean;

  @Expose()
  message: string;

  @Expose()
  code: number;
}

export class BasePaginationResponse<T> {
  @Expose()
  listData: T[];

  @Expose()
  total: number;

  @Expose()
  totalPage: number;
}
export class BaseApiListResponse<T> extends BaseApi {
  @Expose()
  data: T[];
}

export class BaseApiResponse<T> extends BaseApi {
  @Expose()
  data: T;
}

export class DictionaryPaginationResponse<T> {
  @Expose()
  data: T;

  @Expose()
  total: number;

  @Expose()
  next: boolean;
}
