```

Learn and explore Node.js with this collection of example projects featuring different technologies and ideas. Each project offers a unique challenge and showcases practical use cases to help devs take Node.js skills to the next level.

```

## 1-Todo App API Documentation

## Overview

This is a simple API for a Todo App, built using Node.js and Express.

## Usage

To use the API, you can send HTTP requests to the following endpoints:

### GET /todos

Returns a list of all todos.

Example request:

`GET /todos` 

Example response:


```
[
    {
        "id": "a7d95c0e-7e11-4c17-b57d-159d8b0bb7eb",
        "name": "Buy groceries",
        "isCompleted": false
    },
    {
        "id": "c79d9554-f12e-4b4e-aaad-53f9eb7dcf1a",
        "name": "Do laundry",
        "isCompleted": true
    }
]
```

### GET /todos/:id

Returns a single todo by ID.

Example request:


`GET /todos/a7d95c0e-7e11-4c17-b57d-159d8b0bb7eb` 

Example response:


```
{
    "id": "a7d95c0e-7e11-4c17-b57d-159d8b0bb7eb",
    "name": "Buy groceries",
    "isCompleted": false
}
``` 

### POST /todos

Creates a new todo.

Example request:

`POST /todos`

Request body:
```
{
    "name": "Clean the house"
}
``` 

Example response:


```
{
    "id": "4f5b1e8e-9dc3-4f58-93e2-c07b3d01a654",
    "name": "Clean the house",
    "isCompleted": false
}
```

### PUT /todos/:id

Updates a todo by ID.

Example request:

`PUT /todos/a7d95c0e-7e11-4c17-b57d-159d8b0bb7eb`

Request body:
```
{
    "name": "Buy groceries and clean the kitchen",
    "isCompleted": true
}
```

Example response:

```
{
    "id": "a7d95c0e-7e11-4c17-b57d-159d8b0bb7eb",
    "name": "Buy groceries and clean the kitchen",
    "isCompleted": true
}
```

### DELETE /todos/:id

Deletes a todo by ID.

Example request:

`DELETE /todos/a7d95c0e-7e11-4c17-b57d-159d8b0bb7eb` 

Example response:

`Status: 204 No Content` 

## Error Responses

If an error occurs, the API will return an appropriate error response with an appropriate HTTP status code.

### Error Codes

Status Code

Description

404

Todo not found

### Example Error Response

`Status: 404 Not Found
{
    "message": "Todo not found"
}`


# 2- Blogger Example

This project is a blogger system built using Node.js, Express, and JWT. It allows users to post and edit blog posts after logging in. Users who are not logged in can still view posts. The system has a daily limit of 10 posts per user, and all data is stored in memory.

## Installation

1.  Clone the repository to your local machine.
2.  Run `npm install` to install dependencies.
3.  Start the server using `node app.js`.

## Usage

### Logging In

The `/login` route is used to log in to the system. The user must provide a valid email and password. If the credentials are correct, a JWT token is returned in the response.

### Logging Out

The `/logout` route is used to log out of the system. The user must provide a valid JWT token in the request headers. Once logged out, the token is no longer valid.

### Posting and Editing

The `/posts` route is used to post and edit blog posts. The user must provide a valid JWT token in the request headers. Users are limited to 10 posts per day.

### Registering

The `/register` route is used to register a new user. The user must provide a valid email and password.

### Viewing Posts

Users who are not logged in can view posts by accessing the `/posts` route.