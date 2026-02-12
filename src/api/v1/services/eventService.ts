import { Event } from '../models/eventModel';

// list of stored events
const events: Event[] = [];

export const createEventService = async (
    eventData: {
        name: string;
        date: string;
        capacity: number;
        registrationCount?: number;
        status?: string;
        category?: string;
    }): Promise<Event> => 
{
    // create a new event and automatically assign values to 
    // undefined fields and current timestamp to new events
    const newEvent: Event =
    {
        id: `evt_${events.length+1}`,
        name: eventData.name,
        date: eventData.date,
        capacity: eventData.capacity,
        registrationCount: eventData.registrationCount || 0,
        status: eventData.status || "active",
        category: eventData.category || "general",
        createdAt: new Date().toISOString()
    };

    events.push(newEvent);
    return newEvent;
};