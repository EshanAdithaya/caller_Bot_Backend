import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server } from './schemas/server.schema';
import { CreateServerDto } from './dto/create-server.dto';

@Injectable()
export class ServersService {
  constructor(
    @InjectModel(Server.name) private serverModel: Model<Server>
  ) {}

  async findAll(): Promise<Server[]> {
    return this.serverModel.find().exec();
  }

  async create(createServerDto: CreateServerDto): Promise<Server> {
    const createdServer = new this.serverModel(createServerDto);
    return createdServer.save();
  }

  async remove(id: string) {
    return this.serverModel.findByIdAndDelete(id).exec();
  }
}