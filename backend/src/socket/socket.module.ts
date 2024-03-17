import {Module} from '@nestjs/common';
import {SocketService} from './socket/socket.service';
import {SocketGateway} from './socket/socket.gateway';

@Module({
    exports: [SocketGateway],
    providers: [SocketService, SocketGateway],
})
export class SocketModule {
}
