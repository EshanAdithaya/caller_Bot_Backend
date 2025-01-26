import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServersModule } from './modules/servers/servers.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/alert-system'),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/alert-system'),
    ServersModule,
    ContactsModule,
    NotificationsModule,
    AuthModule,
  ],
})
export class AppModule {}