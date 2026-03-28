# Events Managing RESTful API

## Project Overview

This project is a RESTful API for managing event creation, updates, and tracking for event organizers. It supports CRUD operations on events with capacity management, registration tracking, and status updates.

The API solves the challenge of coordinating event logistics by enforcing business rules like future dates only, minimum capacity (5+), and registration limits.

## Installation Instructions

### Prerequisites

- Node.js ≥ 18.0.0  
- npm ≥ 9.0.0  
- Firebase Setup  
- Git  

### Installation Commands

#### 1. Clone Eepository

git clone https://github.com/lmekler/bed_assignment_3.git  
cd bed-assignment-3

#### 2. Install Dependencies
npm install

### Environment Variables Setup

#### 1. Create Environment Variables File

```
NODE_ENV=development  
PORT=3000  
FIREBASE_PROJECT_ID="firebase_project_id"  
FIREBASE_PRIVATE_KEY="firebase_private_key"  
FIREBASE_CLIENT_EMAIL="firebase_client_email"  
SWAGGER_SERVER_URL=http://localhost:3000/api/v1  
```

#### 2. Connect With Firebase
Go to Firebase Console → Project Settings → Web API Key  
Add the following to .env file:  
FIREBASE_PROJECT_ID  
FIREBASE_PRIVATE_KEY  
FIREBASE_CLIENT_EMAIL 

### Start Server Command

npm start

## API Request Examples

### Get All Events

**Request**
```
curl --request GET \
  --url http://localhost:3000/api/v1/events
```

**Response**
```
{
  "status": "success",
  "count": 0,
  "data": []
  "message": "Events retrieved successfully"
}
```

### Create Event

**Request**
```
curl --request POST \
  --url http://localhost:3000/api/v1/events \
  --header 'content-type: application/json' \
  --data '{
  "name": "Event Name",
  "date": "January 1 2027",
  "capacity": 10
}'
```

**Response**
```
{
  "status": "success",
  "data": {
    "id": "event_id",
    "name": "Event Name",
    "date": "2027-01-01T06:00:00.000Z",
    "capacity": 10,
    "registrationCount": 0,
    "status": "active",
    "category": "general",
    "createdAt": "2026-03-28T00:00:00.000Z",
    "updatedAt": "2026-03-28T00:00:00.000Z"
  },
  "message": "Event created successfully"
}
```

### Update Event

**Request**
```
curl --request PUT \
  --url http://localhost:3000/api/v1/events/event_id \
  --header 'content-type: application/json' \
  --data '{
  "registrationCount": 10
}'
```

**Response**
```
{
  "status": "success",
  "data": {
    "id": "event_id",
    "name": "Event Name",
    "date": "2027-01-01T06:00:00.000Z",
    "capacity": 10,
    "registrationCount": 10,
    "status": "active",
    "category": "general",
    "createdAt": "2026-03-28T00:00:00.000Z",
    "updatedAt": "2026-03-28T00:00:00.000Z"
  },
  "message": "Event updated successfully"
}
```

## Link to Public Documentation

Full API documentation is available at: https://lmekler.github.io/bed_assignment_3/

## Local Documentation Access

When running locally, access the API documentation at: http://localhost:3000/api-docs
