import { Event } from '../models/eventModel';
import { createDocument, getDocuments, 
    getDocumentById, updateDocument,
    deleteDocument } from "../repositories/firestoreRepository";

// name of the Firestore collection for events
const COLLECTION = "events";

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

    try 
    {
        // create a new event and automatically assign values to 
        // undefined fields and current timestamp to new events
        const newEvent: Event =
        {
            name: eventData.name,
            date: eventData.date,
            capacity: eventData.capacity,
            registrationCount: eventData.registrationCount || 0,
            status: eventData.status || "active",
            category: eventData.category || "general",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const id = await createDocument<Event>(COLLECTION, newEvent);

        return { id, ...newEvent } as Event;
    } 
    catch (error: unknown) 
    {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create event: ${errorMessage}`);
    }
};

export const getAllEventsService = async (): Promise<Event[]> => 
{
    try 
    {
        const snapshot = await getDocuments(COLLECTION);

        const events = snapshot.docs.map((doc) => 
        {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Event;
        });

        return events;
    } 
    catch (error: unknown)
    {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to retrieve all events: ${errorMessage}`);
    }
};

export const getEventService = async (id: string): Promise<Event> =>
{
    try 
    {
        const doc = await getDocumentById(COLLECTION, id);

        if (!doc) 
        {
            throw new Error(`Event with ID ${id} not found`);
        }

        const data = doc.data();

        const event: Event = {
            id: doc.id,
            ...data,
            createdAt: data?.createdAt?.toDate() || new Date(),
            updatedAt: data?.updatedAt?.toDate() || new Date(),
        } as Event;

        return event;
    } 
    catch (error: unknown) 
    {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to retrieve the event: ${errorMessage}`);
    }

}

export const updateEventService = async (id: string, eventData: Partial<Pick<
    Event, "registrationCount" | "status">> ): Promise<Event> =>
{
    try 
    {
        const updateData = {
            ...eventData,
            updatedAt: new Date().toISOString(),
        };
        
        await updateDocument<Event>(COLLECTION, id, updateData);

        // Return the updated item
        const updatedEvent = await getEventService(id);
        return updatedEvent;
    } 
    catch (error: unknown)
    {
        const errorMessage =error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update event ${id}: ${errorMessage}`);
    }
};

export const deleteEventService = async (id: string): Promise<void> =>
{
    try 
    {
        // Check if item exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) 
        {
            throw new Error(`Event with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } 
    catch (error: unknown)
    {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete the event: ${errorMessage}`);
    }
}