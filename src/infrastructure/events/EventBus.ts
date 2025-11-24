import { MessageSent } from '../../domain/events/MessageSent';
import { UserConnected } from '../../domain/events/UserConnected';
import { UserDisconnected } from '../../domain/events/UserDisconnected';

export type DomainEvent = MessageSent | UserConnected | UserDisconnected;

export type EventHandler = (event: DomainEvent) => void;

export class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  subscribe(eventType: string, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }

  publish(event: DomainEvent): void {
    const eventType = event.constructor.name;
    const handlers = this.handlers.get(eventType) || [];
    
    handlers.forEach(handler => {
      try {
        handler(event);
      } catch (error) {
        console.error(`Error handling event ${eventType}:`, error);
      }
    });
  }
}

