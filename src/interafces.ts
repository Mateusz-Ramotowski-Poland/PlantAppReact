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

export interface Plant {
  id: string;
  created_at: string;
  name: string;
  species: string;
  watering_interval: number;
  last_watering: string;
  next_watering: string;
  watering_count: string;
  sun_exposure: number;
  temperature: number;
}

export interface ApiError {
  errMessages: Record<string, string[]>;
  defaultMessage: string;
}
