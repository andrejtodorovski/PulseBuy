// src/chat/chat.gateway.ts
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Configure according to your environment
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;
  users = new Map<string, string>(); // Map socket ID to username

  handleConnection(client: Socket, ...args: any[]) {
    const username = client.handshake.query.username;
    if (username) {
      this.users.set(client.id, username as string);
      console.log(`${username} connected with ID: ${client.id}`);
    }
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, message: { sender: string; recipient: string; content: string }): void {
    const recipientSocketId = [...this.users.entries()].find(([key, value]) => value === message.recipient)?.[0];
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('receiveMessage', message);
    }
  }
}
