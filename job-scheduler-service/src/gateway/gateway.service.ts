import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})

@Injectable()
export class GatewayService
    implements OnGatewayConnection, OnGatewayDisconnect {
    private clients = new Set<Socket>();

    handleConnection(client: Socket) {
        console.log('Client connected: ' + client.id);
        this.clients.add(client);
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected: ' + client.id);
        this.clients.delete(client);
    }

    @SubscribeMessage('sendNotification')
    handleNotification(@MessageBody() message: string): WsResponse<string> {
        this.clients.forEach(client => {
            console.log('message received');
            client.emit('send-notification', message);
        });
        return { event: 'send-notification', data: message };
    }
}
