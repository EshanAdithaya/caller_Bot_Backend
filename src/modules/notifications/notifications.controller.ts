@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(): Promise<Notification[]> {
    return this.notificationsService.getNotifications();
  }

  @Post('error')
  async reportError(@Body() errorReport: { serverId: string, error: string }) {
    return this.notificationsService.processServerError(
      errorReport.serverId,
      errorReport.error
    );
  }
}

// ESP32 Communication endpoint
@Controller('esp32')
export class ESP32Controller {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly notificationsService: NotificationsService
  ) {}

  @Post('notification-status')
  async updateNotificationStatus(
    @Body() status: {
      notificationId: string,
      callStatus: boolean,
      smsStatus: boolean
    }
  ) {
    return this.notificationsService.updateStatus(
      status.notificationId,
      status.callStatus,
      status.smsStatus
    );
  }

  @Get('contacts')
  async getActiveContacts() {
    return this.contactsService.findActive();
  }
}