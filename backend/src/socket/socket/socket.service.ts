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
}
