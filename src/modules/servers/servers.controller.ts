import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ServersService } from './servers.service';
import { Server } from './schemas/server.schema';
import { CreateServerDto } from './dto/create-server.dto';

@ApiTags('servers')
@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all servers' })
  @ApiResponse({ status: 200, type: Server, isArray: true })
  async findAll(): Promise<Server[]> {
    return this.serversService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create new server' })
  @ApiResponse({ status: 201, type: Server })
  async create(@Body() createServerDto: CreateServerDto): Promise<Server> {
    return this.serversService.create(createServerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete server by ID' })
  @ApiResponse({ status: 200, description: 'Server deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.serversService.remove(id);
  }

  @Get('config')
  @ApiOperation({ summary: 'Get ESP32 configuration' })
  @ApiResponse({ status: 200, description: 'Returns server configuration for ESP32' })
  async getESP32Config() {
    const servers = await this.serversService.findAll();
    return {
      servers: servers.map(s => ({
        id: s._id.toString(),
        url: s.url,
        priority: s.priority
      }))
    };
  }
}