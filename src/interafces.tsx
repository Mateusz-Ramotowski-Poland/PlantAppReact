export interface credentialsInterface {
  username: string;
  password: string;
}

export interface formErrorState {
  passwordMissmatch?: boolean;
  onlyDigits?: boolean;
}

export interface tokenInterface {
  access: string;
  refresh: string;
}
