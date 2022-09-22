export interface CredentialsInterface {
  username: string;
  password: string;
}

export interface FormErrorState {
  passwordMissmatch?: boolean;
  onlyDigits?: boolean;
}

export interface TokenInterface {
  access: string;
  refresh: string;
}
