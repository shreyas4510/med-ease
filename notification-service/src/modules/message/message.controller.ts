import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller()
export class MessageController {

    constructor(
        private messageService: MessageService
    ) {}

    @HttpCode(200)
    @Post('webhook')
    async ratingWebhook( @Body() body ): Promise<void> {
      try {
        const patientContact = body.WaId.substr(2, 10);
        const message = (body.Body.split('-')[1]).trim()
        const key: string = (body.Body.split('-')[0]).trim();

        if( key.toUpperCase() !== 'RATING' ) {
          console.log('Invalid message received');
          return;
        }
        await this.messageService.processWebhook(patientContact, message);
      } catch (error) {
        throw error;
      }
    }
}
