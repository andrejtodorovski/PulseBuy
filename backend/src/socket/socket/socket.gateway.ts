import {OnGatewayConnection, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Socket} from "socket.io";
import {SocketService} from "./socket.service";

@WebSocketGateway({cors: true})
export class SocketGateway implements OnGatewayConnection {
    @WebSocketServer()
    private server: Socket;

    constructor(private readonly socketService: SocketService) {
    }

    handleConnection(socket: Socket): void {
        this.socketService.handleConnection(socket);
    }

    sendEventToAllClients(event: string, data: any): void {
        this.socketService.broadcastMessage(event, data);
    }

    // Implement other Socket.IO event handlers and message handlers
}
