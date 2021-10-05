## **Peddle**

---

### How to run in development environment

issue  ```npm run dev``` command under your server folder

---

### **Api's**
| | | |
|---|---|---|
| **Auth Service** |
| Operation | Route | Desc. |
| POST | /api/auth/signin      | user sign in     |
| POST | /api/auth/signout     | user sign out    |
| POST | /api/auth/signup      | add a new user to db and then automatically sign in |
| GET  | /api/auth/currentuser | get current user object |
| **User Service** |
| Operation | Route | Desc. |
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
| GET | /api/chat/{userId} | get chat history for a user |
| PUT | /api/chat/{userId} | update chat history for a user |
| POST| /api/chat/{userId}    | create a new chat    

---

### **Useful git commands**

```git status```  Check current git status. Staged file will be shown in green, and un-staged in red. 

```git add .```  Issue this command when you want git to stage(track) all newly added file(s)/folder(s)

```git commit -m "my message"``` Issue this command when you are happy with the current code.

```git push``` Issue this command to update github repo

```git checkout -b "feature/my branch name"``` **create** a new branch called 'feature/my branch name'

```git checkout "feature/my branch name"``` **checkout** to an existing branch called 'feature/my branch name'

---