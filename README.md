[![test](https://github.com/SionYoung/peddle/actions/workflows/integrate.yml/badge.svg)](https://github.com/SionYoung/peddle/actions/workflows/integrate.yml)

## **Peddle**

---

### How to run in development environment

issue  ```npm run dev``` command under your server folder

---

### **Api Quick reference**
| | | |
|---|---|---|
| **Auth Service** |
| Operation | Route | Desc. |
| POST | /api/auth/signin      | user sign in     |
| POST | /api/auth/signout     | user sign out    |
| POST | /api/auth/signup      | add a new user to db and then automatically sign in |
| GET  | /api/auth/current-user | get current user object |
| **User Service** |
| Operation | Route | Desc. |
| GET  | /api/users/{userId}        | get a user by id |
| GET  | /api/users/post-items      | get listed items for current user |
| GET  | /api/users/purchased-items | get purchased items for current user |
| PUT  | /api/users/current-user    | update current user's info  |
| GET  | /api/users/favourite-items | get current user's favourite items |
| POST | /api/users/favourite       | add an item to user's favourite item list |
| GET  | /api/users/seen-items      | get current user's seen items |
| PATCH | /api/users/seen-items     | update to user's seen item list |
| **Item Service** |
| Operation | Route | Desc. |
| GET    | /api/items          | get 10 items on the market            |
| GET    | /api/items/{itemId} | get one specific item on the market   |
| POST   | /api/items          | post an item on the market for a user |
| PATCH    | /api/items/{itemId} | update an item on the market        |
| DELETE | /api/items/{itemId} | delete an item on the market          |
| **Purchase Service** |
| Operation | Route | Desc. |
| POST | /api/purchase/{itemId}/ | purchase an item |
| **Chat Service** | 
| Operation | Route | Desc. |
| GET | /api/chat/{userId} | get chat history for a user |
| PUT | /api/chat/{userId} | update chat history for a user |
| POST| /api/chat/{userId} | create a new chat
| **Category Service** | 
| Operation | Route | Desc. |
| GET | /api/categories | get all categories |
| PATCH | /api/categories/{categoryId} | update a category name |
| POST| /api/categories | create a new category    
| DELETE| /api/categories/{categoryId} | delete a category   


---

### **Useful git commands**

```git status```  Check current git status. Staged file will be shown in green, and un-staged in red. 

```git add .```  Issue this command when you want git to stage(track) all newly added file(s)/folder(s)

```git commit -m "my message"``` Issue this command when you are happy with the current code.

```git push``` Issue this command to update github repo

```git checkout -b "feature/my-branch-name"``` **create** a new branch called 'feature/my-branch-name'

```git checkout "feature/my-branch-name"``` **checkout** to an existing branch called 'feature/my-branch-name'

---
