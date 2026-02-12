/**
 * Represents an event in an event planning system
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