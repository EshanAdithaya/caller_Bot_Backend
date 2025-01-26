// contacts.controller.ts
import { Controller, Get, Module } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { MongooseModule } from '@nestjs/mongoose';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all contacts' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns all contacts',
    type: Contact,
    isArray: true 
  })
  async findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active contacts' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns active contacts only',
    type: Contact,
    isArray: true 
  })
  async findActive(): Promise<Contact[]> {
    return this.contactsService.findActive();
  }
}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule {}