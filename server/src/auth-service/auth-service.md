## Auth Service

- The auth service is responsible for signin, signup, signout functionalities. For user authentication, check the authentication section below to learn how to authenticate a user.

- You don't need to worry about managing the jwt and session once signed in. The jwt and User information are stuffed in the session cookie when you sign in, and cleared when you sign out. Simply call the end points to create a session and you are good to go! The session is valid for 10 minutes for the current setup, or you can hit signout endpoint to signout manually.

### Responses

```
SuccessStatus:
200 OK
201 Created

ErrorStatus:
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found

Success Response:
{
    status: SuccessStatusCode,
    message: string
}

Failure Response:
{
    status: ErrorStatusCode
    message: string, // general error message
    errors: [
        {
            message: string // detail message
            field?: string
        }
    ]
}
```

### User session info

```json
     {
        "status": 200,
        "message": "Sucess",
        "data": {
            "currentUser": {
                "id": "616b7731ac2fb9470f888aa9",
                "email": "test2@test.com",
                "firstName": "test",
                "lastName": "user",
                "iat": 1634616544,
                "exp": 1634618344
            }
        }
    }
```

## **`POST` /api/auth/signup**

### request

```json
{
  "firstName": "Tae Kwon",
  "lastName": "Doe",
  "email": "test@test.com",
  "password": "password",
  "lat": 123,
  "lng": 456,
  "postalCode": "N6H 1A2"
} // all fields are required
```

### response

### [user session info](#user-session-info)

</br>

## **`POST` /api/auth/signout**

### request

```json
{}
```

### response

```json
{
  "status": 200,
  "message": "user signed out"
}
```

## **`GET` /api/auth/current-user**

### request

```json
GET {}
```

response:

### [user session info](#user-session-info)

<br>

### Authorization

- How to use authentication middlewares to check if user's logged in?
  pass the **currentUser** and **requireAuth** middlewares to your route handler. Example:

```js
import express from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
const myRoute = express.Router();

myRoute.get('/api/items/purchase', curentUser, requireAuth, (req, res) => {
  // if you reach here, it means the user is authorized.
});
```

- How to get the current user information that is put in the session cookie?
  pass the **currentUser** middlewares to your route handler, and then you can access current user in request body.

  **important**: current-user route provides basic info only for security reasons. To get a user's full information, call `GET /api/users/:userId`

  ### Example

```js
import express from 'express';
import { currentUser } from '../../middlewares/current-user';
const myRoute = express.Router();

myRoute.get('/api/items/purchase', curentUser, (req, res) => {
  console.log(req.body.currentUser);
  /** prints:
    {
        "status": 200,
        "message": "Sucess",
        "data": {
            "currentUser": {
                "id": "klas98234kl23kj4098234lk"
                "email": "test2@test.com",
                "firstName": "test",
                "lastName": "user",
                "iat": 1634616544,
                "exp": 1634618344
        }
    }
    **/
});
```
