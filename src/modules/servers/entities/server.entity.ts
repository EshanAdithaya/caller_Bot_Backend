// src/modules/servers/entities/server.entity.ts
export class Server {
    _id: string;
    url: string;
    name: string;
    priority: string;
    active: boolean;
    lastCheck: Date;
    failureCount: number;
    lastError: string;
  }