import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async findActive(): Promise<Contact[]> {
    return this.contactModel.find({ active: true }).exec();
  }
}
