import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../src/api/v1/middleware/validate';
import { postSchemas } from '../src/api/v1/validation/postSchemas';

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
        mockReq.body = 
        { 
            name: "Event name", 
            date: new Date().toISOString(), 
            capacity: 5,
            registrationCount: 0,
            status: "active",
            category: "conference"
        };

        const middleware = validateRequest(postSchemas.create);

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
        mockReq.body = {};

        const middleware = validateRequest(postSchemas.create);

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
        mockReq.body = 
        {
            name: ""
        };

        const middleware = validateRequest(postSchemas.create);

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
        mockReq.body = 
        { 
            date: new Date(Date.now() - 1).toISOString()
        };

        const middleware = validateRequest(postSchemas.create);

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
        mockReq.body = 
        { 
            capacity: 10.1
        };

        const middleware = validateRequest(postSchemas.create);

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
        mockReq.body = 
        { 
            capacity: 4
        };

        const middleware = validateRequest(postSchemas.create);

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
        mockReq.body = 
        { 
            capacity: 10,
            registrationCount: 11
        };

        const middleware = validateRequest(postSchemas.create);

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
        mockReq.body = 
        { 
            status: "invalid"
        };

        const middleware = validateRequest(postSchemas.create);

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
        mockReq.body = 
        { 
            category: "invalid"
        };

        const middleware = validateRequest(postSchemas.create);

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