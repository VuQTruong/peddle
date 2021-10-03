[![test](https://github.com/SionYoung/peddle/actions/workflows/integrate.yml/badge.svg)](https://github.com/SionYoung/peddle/actions/workflows/integrate.yml)

# Peddle

## API
| | | |
|---|---|---|
| **Auth Service** |
| Operation | Route | Desc. |
| POST | /api/auth/signin      | user sign in     |
| POST | /api/auth/signout     | user sign out    |
| POST | /api/auth/signup      | user sign up     |
| GET | /api/auth/currentuser  | get current user |
| **User Service** |
| Operation | Route | Desc. |
| POST | /api/users                        | add a user |
| GET  | /api/users/{userId}               | get a user |
| GET  | /api/users/{userId}/posts         | get listed items for a user |
| GET  | /api/users/{userId}/purchasedItem | get purchased items for a user |
| PUT  | /api/users/{userId}               | update user info  |
| **Item Service** |
| Operation | Route | Desc. |
| GET    | /api/items          | get all items on the market           |
| POST   | /api/items          | post an item on the market for a user |
| PUT    | /api/items/{itemId} | update an item on the market          |
| DELETE | /api/items/{itemId} | delete an item on the market          |
| **Purchase Service** |
| Operation | Route | Desc. |
| POST | /api/purchase/{itemId}/ | purchase an item |
| **Chat Service** | 
| Operation | Route | Desc. |
| POST | /api/purchase/{itemId}/ | purchase an item |
| GET | /api/chat/{userId} | get chat history for a user |
| PUT | /api/chat/{userId} | update chat history for a user |
