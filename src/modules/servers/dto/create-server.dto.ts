import { Priority } from '../schemas/server.schema';

export class CreateServerDto {
  url: string;
  name: string;
  priority: Priority;
}