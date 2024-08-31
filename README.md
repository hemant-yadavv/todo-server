
# Todo Backend API

Welcome to the Todo Backend API! This API allows users to sign up, log in, and manage their todo tasks. The backend is hosted at [Todo Backend API](https://todo-server-chth.onrender.com/).

## Base URL
```
https://todo-server-chth.onrender.com/
```

## API Endpoints

### 1. Sign Up
**Endpoint:** `POST /api/v1/signup`

**Description:** Create a new user account.

**Request Body:**
```json
{
    "name": "hemantyadav",
    "email": "hemantyadav@gmail.com",
    "password": "12345678"
}
```

### 2. Log In
**Endpoint:** `POST /api/v1/login`

**Description:** Log in to an existing account.

**Request Body:**
```json
{
    "email": "hemantyadav@gmail.com",
    "password": "12345678"
}
```

### 3. Create Todo
**Endpoint:** `POST /api/v1/createTodo`

**Description:** Create a new todo item.

**Request Body:**
```json
{
    "title": "todo title",
    "description": "description" // optional
}
```

### 4. Update Todo
**Endpoint:** `PUT /api/v1/updateTodo/:id`

**Description:** Update an existing todo item.

**Request Body:**
```json
{
    "title": "todo title",
    "description": "description" // optional
}
```

**Example:**
```
https://todo-server-chth.onrender.com/api/v1/updateTodo/66d317032d4897da706432e3
```

### 5. Delete Todo
**Endpoint:** `DELETE /api/v1/deleteTodo/:id`

**Description:** Delete a todo item.

**Example:**
```
https://todo-server-chth.onrender.com/api/v1/deleteTodo/66d317032d4897da706432e3
```

### 6. Get Todos
**Endpoint:** `GET /api/v1/getTodos`

**Description:** Retrieve all todo items.

**Example:**
```
https://todo-server-chth.onrender.com/api/v1/getTodos
```
