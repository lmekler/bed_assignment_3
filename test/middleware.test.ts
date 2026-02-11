import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../src/api/v1/middleware/validate';
import Joi from 'joi';

describe('validateRequest Middleware', () => 
{
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => 
    {
        mockReq = 
        {
            headers: {},
            params: {},
            body: {}
        };

        mockRes = 
        {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {}
        };
        
        mockNext = jest.fn();
    });

    it('should pass for valid input', () => 
    {
        // Arrange
        const testSchemas = 
        {
            body: Joi.object(
            {
                name: Joi.string().required().min(3),
                date: Joi.date().required().greater(new Date().toISOString()),
                capacity: Joi.number().required().integer().min(5),
                registrationCount: Joi.number().integer().max(Joi.ref("capacity")).default(0),
                status: Joi.string().valid("active", "cancelled", "completed").default("active"),
                category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general")
            })
        }
        
        mockReq.body = 
        { 
            name: "Event name", 
            date: new Date().toISOString(), 
            capacity: 5,
            registrationCount: 0,
            status: "active",
            category: "conference"
        };

        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('should fail for missing name', () => 
    {
        // Arrange
        const testSchemas = 
        {
            body: Joi.object(
            {
                name: Joi.string().required().min(3)
            })
        }

        mockReq.body = {};

        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error")
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail for name shorter than 3 characters', () => 
    {
        // Arrange
        const testSchemas = 
        {
            body: Joi.object(
            {
                name: Joi.string().required().min(3)
            })
        }

        mockReq.body = 
        {
            name: ""
        };

        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error")
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail for date in the past', () => 
    {
        // Arrange
        const testSchemas = 
        {
            body: Joi.object(
            {
                date: Joi.date().required().greater(new Date().toISOString())
            })
        }

        mockReq.body = 
        { 
            date: new Date(Date.now() - 1).toISOString()
        };

        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error")
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail for non-integer capacity', () => 
    {
        // Arrange
        const testSchemas = 
        {
            body: Joi.object(
            {
                capacity: Joi.number().required().integer().min(5),
            })
        }

        mockReq.body = 
        { 
            capacity: 10.1
        };

        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error")
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail for capacity less than 5', () => 
    {
        // Arrange
        const testSchemas = 
        {
            body: Joi.object(
            {
                capacity: Joi.number().required().integer().min(5),
            })
        }

        mockReq.body = 
        { 
            capacity: 4
        };

        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error")
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail for registration count exceeding capacity', () => 
    {
        // Arrange
        const testSchemas = 
        {
            body: Joi.object(
            {
                registrationCount: Joi.number().integer().max(Joi.ref("capacity")).default(0)
            })
        }

        mockReq.body = 
        { 
            capacity: 10,
            registrationCount: 11
        };

        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error")
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail for invalid status', () => 
    {
        // Arrange
        const testSchemas = 
        {
            body: Joi.object(
            {
                status: Joi.string().valid("active", "cancelled", "completed").default("active")
            })
        }

        mockReq.body = 
        { 
            status: "invalid"
        };

        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error")
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail for invalid category', () => 
    {
        // Arrange
        const testSchemas = 
        {
            body: Joi.object(
            {
                category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general")
            })
        }

        mockReq.body = 
        { 
            category: "invalid"
        };

        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error")
        });
        expect(mockNext).not.toHaveBeenCalled();
    });
});