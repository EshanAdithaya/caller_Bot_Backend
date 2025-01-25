import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Get()
  async findAll(): Promise<Server[]> {
    return this.serversService.findAll();
  }

  @Post()
  async create(@Body() createServerDto: CreateServerDto): Promise<Server> {
    return this.serversService.create(createServerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.serversService.remove(id);
  }

  @Get('config')
  async getESP32Config() {
    const servers = await this.serversService.findAll();
    return {
      servers: servers.map(s => ({
        id: s._id,
        url: s.url,
        priority: s.priority
      }))
    };
  }
}
