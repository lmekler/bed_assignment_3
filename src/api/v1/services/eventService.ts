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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    events.push(newEvent);
    return newEvent;
};

export const getAllEventsService = async (): Promise<Event[]> => 
{
    return structuredClone(events);
};

export const getEventService = async (id: string): Promise<Event | undefined> =>
{
    let event: Event | undefined = events.find(event => event.id === id);
    return structuredClone(event);
}

export const updateEventService = async (id: string, eventData: Partial<Pick<
    Event, "registrationCount" | "status">> ): Promise<Event | undefined> =>
{
    const index = events.findIndex(event => event.id === id);
    if (index === -1) return undefined;

    if (eventData.registrationCount !== undefined) 
    {
        if (eventData.registrationCount > events[index].capacity)
        {
            throw new Error("Registration count exceeds event capacity");
        }
        events[index].registrationCount = eventData.registrationCount;
    }

    if (eventData.status !== undefined) 
    {
        events[index].status = eventData.status;
    }

    events[index].updatedAt = new Date().toISOString();
    return structuredClone(events[index]);
};

export const deleteEventService = async (id: string): Promise<boolean> =>
{
    const index = events.findIndex(event => event.id === id);
    if (index === -1) return false;

    events.splice(index, 1)
    return true;
}