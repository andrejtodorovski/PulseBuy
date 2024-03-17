import {Module} from '@nestjs/common';
import {PulseBuyEventListener} from "./listeners/pulse-buy-event.listener";
import {SocketModule} from "../socket/socket.module";

@Module({
    imports: [SocketModule],
    providers: [PulseBuyEventListener],
})
export class EventsModule {
}
