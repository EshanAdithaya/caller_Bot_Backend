import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServersModule } from './modules/servers/servers.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/alert-system'),
    ServersModule,
    ContactsModule,
    NotificationsModule,
  ],
})
export class AppModule {}