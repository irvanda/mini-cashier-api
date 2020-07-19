interface BaseResponse<T> {
  success: boolean;
  data: T | null;
  error: any;
}

export { BaseResponse };
