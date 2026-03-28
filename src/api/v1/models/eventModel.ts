/**
 * Represents an event in an event planning system
 * @param id - Unique identifier
 * @param name - Name if event
 * @param date - Date of the event
 * @param capacity - Amount of people the event can hold
 * @param registrationCount - Amount of people registered
 * @param status - Whether the event is active, cancelled, or completed
 * @param category - Optional category to describe the event type
 * @param createdAt - Timestamp for when the event was created
 * @param updatedAt - Timestamp for last time the event was updated
 */
export interface Event 
{
    /** Unique ID for the event */
    id?: string;

    /* Name of the event */
    name: string;

    /** Date of the event */
    date: string;

    /** Capacity of the event */
    capacity: number;

    /** Amount of registrations for the event */
    registrationCount?: number;

    /** Status of the event */
    status?: string;

    /** Category of the event */
    category?: string;

    /** Creation timestamp of the event */
    createdAt?: string;

    /** Last update timestamp of the event */
    updatedAt?: string;
}