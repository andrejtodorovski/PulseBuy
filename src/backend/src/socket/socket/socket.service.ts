import {Injectable} from '@nestjs/common';
import {Socket} from 'socket.io';

@Injectable()
export class SocketService {
    private readonly connectedClients: Map<string, Socket> = new Map();

    handleConnection(socket: Socket): void {
        const clientId = socket.id;
        this.connectedClients.set(clientId, socket);

        socket.on('disconnect', () => {
            this.connectedClients.delete(clientId);
        });

        // Handle other events and messages from the client
        socket.on('message', (data) => {
            console.log('Received message:', data);
        });

        // Handle joining room
        socket.on('joinRoom', (roomId: string) => {
            socket.join(roomId);
        });

        // Handle leaving room
        socket.on('leaveRoom', (roomId: string) => {
            socket.leave(roomId);
        });
    }

    // Method to send a message to a specific client
    sendMessage(clientId: string, event: string, data: any): void {
        const socket = this.connectedClients.get(clientId);
        if (socket) {
            socket.emit(event, data);
        } else {
            console.log('Client not found:', clientId);
        }
    }

    // Method to broadcast a message to all connected clients
    broadcastMessage(event: string, data: any): void {
        this.connectedClients.forEach((socket) => {
            socket.emit(event, data);
        });
    }

    // Method to broadcast a message to all clients in a specific room
    broadcastMessageToRoom(roomId: string, event: string, data: any): void {
        this.connectedClients.forEach((socket) => {
            if (socket.rooms.has(roomId)) {
                socket.emit(event, data);
            }
        });
    }
}
