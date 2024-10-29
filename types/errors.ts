export interface ApiError {
  message: string;
  status?: number;
  details?: string;
}

export class NetworkError extends Error {
  public status: number;
  public details?: string;

  constructor(message: string, status: number, details?: string) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
    this.details = details;
  }
}
