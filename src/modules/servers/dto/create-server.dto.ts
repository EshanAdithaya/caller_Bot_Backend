export class CreateServerDto {
    url: string;
    name: string;
    priority: string;
    active?: boolean;
    failureCount?: number;
    lastError?: string;
  }