import * as eventService from '../src/api/v1/services/eventService';
import * as firestoreRepository from '../src/api/v1/repositories/firestoreRepository';
import { Event } from '../src/api/v1/models/eventModel';

// Mock the repository module
jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Event Service', () => 
{
    beforeEach(() => 
    {
        jest.clearAllMocks();
    });

    it("should create an event successfully", async () => 
    {
        // Arrange
        const mockEventData: Event = 
        {
            name: "Test Event",
            date: new Date().toISOString(),
            capacity: 100
        }

        const mockEventId: string = "event1";

        (firestoreRepository.createDocument as jest.Mock)
            .mockResolvedValue(mockEventId);

        // Act
        const result: Event = await eventService.createEventService(mockEventData);
        
        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "events",
            expect.objectContaining(
            {
                name: mockEventData.name,
                date: mockEventData.date,
                capacity: mockEventData.capacity,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        );
        expect(result.id).toBe(mockEventId);
        expect(result.name).toBe(mockEventData.name);
    });

    it("should return list of events successfully", async () => 
    {
        // Arrange
        const mockEventCollection = 
        {
            docs: 
            [
                {
                    id: "event1",
                    data: () => (
                    {
                        name: "Event One",
                        date: 
                        {
                            toDate: () => new Date()
                        },
                        capacity: 100,
                        registrationCount: 10,
                        status: "active",
                        category: "general",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    })
                },
                {
                    id: "event2",
                    data: () => (
                    {
                        name: "Event Two",
                        date: 
                        {
                            toDate: () => new Date()
                        },
                        capacity: 50,
                        registrationCount: 5,
                        status: "active",
                        category: "workshop",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    })
                }
            ]
        };

        (firestoreRepository.getDocuments as jest.Mock)
            .mockResolvedValue(mockEventCollection);

        // Act
        const result = await eventService.getAllEventsService();
        
        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("events");
        expect(result).toEqual(
            [
                {
                    id: "event1",
                    name: "Event One",
                    date: expect.any(String),
                    capacity: 100,
                    registrationCount: 10,
                    status: "active",
                    category: "general",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                {
                    id: "event2",
                    name: "Event Two",
                    date: expect.any(String),
                    capacity: 50,
                    registrationCount: 5,
                    status: "active",
                    category: "workshop",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }
            ]
        );
    });

    it("should return event by id successfully", async () => 
    {
        // Arrange
        const mockEvent =
        {
            id: "event1",
            data: () => (
            {
                name: "Event One",
                date: 
                {
                    toDate: () => new Date()
                },
                capacity: 100,
                registrationCount: 10,
                status: "active",
                category: "general",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
        };

        (firestoreRepository.getDocumentById as jest.Mock)
            .mockResolvedValue(mockEvent);

        // Act
        const result = await eventService.getEventService("event1");
        
        // Assert
        expect(firestoreRepository.getDocumentById)
            .toHaveBeenCalledWith("events", "event1");
        expect(result).toEqual(
            {
                id: "event1",
                name: "Event One",
                date: expect.any(String),
                capacity: 100,
                registrationCount: 10,
                status: "active",
                category: "general",
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        );
    });

    it("should update an event successfully", async () => 
    {
        // Arrange
        const mockEvent = 
        {
            name: "Event One",
            date: 
            {
                toDate: () => new Date()
            },
            capacity: 100,
            registrationCount: 0,
            status: "active",
            category: "general",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const updatedEventData = 
        {
            ...mockEvent,
            registrationCount: 100,
            status: "completed"
        };

        (firestoreRepository.updateDocument as jest.Mock)
            .mockResolvedValue(undefined);

        (firestoreRepository.getDocumentById as jest.Mock)
            .mockResolvedValueOnce(
            {
                data: () => mockEvent
            })
            .mockResolvedValueOnce(
            {
                data: () => updatedEventData
            });

        // Act
        const result = await eventService.updateEventService(
            "event1",
            { 
                registrationCount: 100,
                status: "completed"
            }
        );

        // Assert
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "events",
            "event1",
            {
                registrationCount: 100,
                status: "completed",
                updatedAt: expect.any(String)
            }
        );

        expect(result.registrationCount).toBe(100);
        expect(result.status).toBe("completed");
    });

    it("should delete an event successfully", async () => 
    {
        // Arrange
        const mockDocumentId: string = "event1";
        const mockEvent: Event = 
        {
            id: "event1",
            name: "Event One",
            date: expect.any(String),
            capacity: 100,
            registrationCount: 10,
            status: "active",
            category: "general",
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        }

        // jest.spyOn creates a mock for a specific method/function on an object, in our example the itemService
        jest.spyOn(eventService, "getEventService").mockResolvedValue(mockEvent);

        // jest.Mock replaces the auto-mocked version with our specific mocked implementation
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
            undefined
        );

        // Act
        await eventService.deleteEventService(mockDocumentId);

        // Assert
        expect(eventService.getEventService).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "events",
            mockDocumentId
        );
    });
});