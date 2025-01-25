import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';
import { ContactsService } from '../contacts/contacts.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    private contactsService: ContactsService
  ) {}

  async processServerError(serverId: string, error: string): Promise<void> {
    const contacts = await this.contactsService.findActive();
    
    const notification = new this.notificationModel({
      serverId,
      message: error,
      timestamp: new Date(),
    });

    for (const contact of contacts) {
      if (contact.priority === 'high') {
        notification.callAttempted = true;
        // ESP32 call implementation here
        
        if (!notification.callSuccessful) {
          notification.smsAttempted = true;
          // ESP32 SMS implementation here
        }
      } else {
        notification.smsAttempted = true;
        // ESP32 SMS implementation here
      }
    }

    await notification.save();
  }

  async getNotifications(): Promise<Notification[]> {
    return this.notificationModel.find()
      .sort({ timestamp: -1 })
      .limit(100)
      .exec();
  }
}
