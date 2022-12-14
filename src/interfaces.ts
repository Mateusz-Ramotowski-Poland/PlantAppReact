export interface CredentialsInterface {
  username: string;
  password: string;
}

export interface FormErrorState {
  passwordMissmatch?: boolean;
  onlyDigits?: boolean;
}

export interface AuthToken {
  access: string;
  refresh: string;
}

export interface ApiError {
  errMessages: Record<string, string[]>;
  defaultMessage: string;
}

export interface PlantsState {
  plants: RenderPlant[];
}

export interface ApiRenderPlant {
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

export interface RenderPlant extends ApiRenderPlant {
  wateringStatus: string;
}

export interface ApiPlant extends ApiRenderPlant {
  url: string;
  author: string;
  water: string;
}
