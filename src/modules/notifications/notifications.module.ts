import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from './notifications.service';
import { ESP32Controller, NotificationsController } from './notifications.controller';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    ContactsModule
  ],
  controllers: [NotificationsController, ESP32Controller],
  providers: [NotificationsService],
})
export class NotificationsModule {}