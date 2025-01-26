import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
import { NotificationsService } from "./notifications.service";
import { Notification } from "./schemas/notification.schema";
import { ContactsService } from "../contacts/contacts.service";

export class ErrorReportDto {
  @ApiProperty()
  serverId: string;

  @ApiProperty()
  error: string;
}

export class NotificationStatusDto {
  @ApiProperty()
  notificationId: string;

  @ApiProperty()
  callStatus: boolean;

  @ApiProperty()
  smsStatus: boolean;
}

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, type: Notification, isArray: true })
  async getNotifications(): Promise<Notification[]> {
    return this.notificationsService.getNotifications();
  }

  @Post('error')
  @ApiOperation({ summary: 'Report server error' })
  @ApiBody({ type: ErrorReportDto })
  @ApiResponse({ status: 201, description: 'Error reported successfully' })
  async reportError(@Body() errorReport: ErrorReportDto) {
    return this.notificationsService.processServerError(
      errorReport.serverId,
      errorReport.error
    );
  }
}

@ApiTags('esp32')
@Controller('esp32')
export class ESP32Controller {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly notificationsService: NotificationsService
  ) {}

  @Post('notification-status')
  @ApiOperation({ summary: 'Update notification status' })
  @ApiBody({ type: NotificationStatusDto })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  async updateNotificationStatus(@Body() status: NotificationStatusDto) {
    return this.notificationsService.updateStatus(
      status.notificationId,
      status.callStatus,
      status.smsStatus
    );
  }

  @Get('contacts')
  @ApiOperation({ summary: 'Get active contacts' })
  @ApiResponse({ status: 200, description: 'Returns active contacts' })
  async getActiveContacts() {
    return this.contactsService.findActive();
  }
}