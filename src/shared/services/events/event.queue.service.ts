import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { LoggerService } from '../logger.service';


//#region Interfaces
export enum EventQueue {
    none = 0,
    default = 'default',
    hello = 'helloQueue.fifo', 
    goodbye = 'goodbyeQueue.fifo'
}

export enum EventMessageGroup {
    test = 'test-event-group',
}

export interface IEventMessage {
    id: string,
    messageBody: string;
    queue: EventQueue;
    group: EventMessageGroup;
}
//#endregion

@Injectable()
export class EventQueueService {

    private readonly sqs: AWS.SQS;

    constructor(
        private readonly logger: LoggerService
    ) {
        AWS.config.update({region:'eu-west-1'});
        this.sqs = new AWS.SQS();
    }

    async publish($event: IEventMessage): Promise<void> {
        this.logger.info(`Event: Publishing: ${$event.queue} - ${$event.group}`, $event);

        await this
                .sqs
                .sendMessage(this.createMessage($event))
                .promise()
                .then(() => this.onComplete($event))
                .catch(err => this.onError(err, $event));
    }

    // private 

    private createMessage($event: IEventMessage) : AWS.SQS.SendMessageRequest
    {
        return {
            MessageBody: $event.messageBody,
            QueueUrl: this.getUrl($event.queue),
            MessageDeduplicationId: $event.id,
            MessageGroupId: $event.group.toString()
        };
    }

    private getUrl(queue: EventQueue): string {

        if (queue == EventQueue.none)
            throw new Error('Event Queue type has not been set in the event being published. EventQueue.none is an invalid queue type');        

        return `http://localhost:9324/queue/${queue.toString()}`;    
    }

    private onComplete($event: IEventMessage) : void {
        this.logger.info(`Event: Consumed: ${$event.queue} - ${$event.group}`, $event);
    }

    private onError(err: any, $event: IEventMessage) : void {
        const eventMsg: string = `Event: Failure: ${$event.queue} - ${$event.group}`;
        this.logger.error(eventMsg, 
        { 
            event: $event, 
            err: err
        });
        
        throw new Error(`Event: Failure: ${eventMsg}. Reason: ${err.message}`);
    }

}
