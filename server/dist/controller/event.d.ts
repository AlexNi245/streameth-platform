import Event, { IEvent } from '../model/event';
export default class EventController {
    private controller;
    constructor();
    getEvent(eventId: IEvent['id'], organizationId: IEvent['organizationId']): Promise<Event>;
    createEvent(event: Omit<IEvent, 'id'>): Promise<Event>;
    getAllEventsForOrganization(organizationId: IEvent['organizationId']): Promise<Event[]>;
    getAllEvents(): Promise<Event[]>;
    importEventData(event: Event): Promise<void>;
}
