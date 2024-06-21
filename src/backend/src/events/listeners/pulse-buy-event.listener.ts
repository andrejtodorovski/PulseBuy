import {Injectable} from "@nestjs/common";
import {SocketGateway} from "../../socket/socket/socket.gateway";
import {OnEvent} from "@nestjs/event-emitter";
import {PULSE_BUY_EVENT} from "../constants";
import {PulseBuyEvent} from "../events/pulse-buy.event";

@Injectable()
export class PulseBuyEventListener {
    constructor(private readonly socketGateway: SocketGateway) {
    }

    @OnEvent(`${PULSE_BUY_EVENT}.**`, {async: true})
    handlePulseBuyEvent(event: PulseBuyEvent): void {
        //this.socketGateway.sendEventToAllClients(event.eventType, event);
        const specificAggregateRoomId = `${event.getAggregateType()}/${event.id}`;
        const aggregateRoomId = event.getAggregateType();
        this.socketGateway.sendEventToRoom(specificAggregateRoomId, event.getEventType(), event);
        this.socketGateway.sendEventToRoom(aggregateRoomId, event.getEventType(), event);
    }
}