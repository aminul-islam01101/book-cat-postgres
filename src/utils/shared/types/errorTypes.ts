export type TGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type TGenericErrorResponse = {
  statusCode: number;
  errorName: string;
  errorMessages: TGenericErrorMessage[];
};
