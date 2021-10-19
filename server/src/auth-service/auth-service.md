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

## User model
```json
    example
     {
        "status": 200,
        "message": "Sucess",
        "data": {
            "currentUser": {
                "email": "test2@test.com",
                "firstName": "test",
                "lastName": "user",
                "lat": 1.111,
                "lng": -1.111,
                "postalCode": "N6N 6N6",
                "isPremiumMember": false,
                "dislikedItemIds": [],
                "postedItems": [
                    "616e3e166a736fbdcebb3670",
                    "616e3ea40cd2b4bd16c195a4"
                ],
                "purchasedItems": [],
                "favouriteItems": [
                    "507f1f77bcf86cd799439011",
                    "507f1f77bcf86cd799439012"
                ],
                "iat": 1634616544,
                "exp": 1634618344
            }
        }
    } 
```

## Examples

**POST /api/auth/signup**

```json
request:
{
  "firstName" : "Tae Kwon",
  "lastName" : "Doe",
  "email" : "test@test.com",
  "password" : "password",
  "lat" : 123,
  "lng" : 456,
  "postalCode" : "N6H 1A2",
}

response:
 see User model
```

**POST /api/auth/signout**

```json
request:
{}
response:
{
    "status": 200,
    "message": "user signed out"
}

```
**GET /api/auth/currentuser**

```json
request:
GET {}

response:
 see User modeld
```

### Authorization

- How to use authentication middlewares to check if user's logged in?
  pass the **currentUser** and **requireAuth** middlewares to your route handler. Example:

```js
    import express from 'express';
    import { currentUser } from '../../middlewares/current-user';
    import { requireAuth } from '../../middlewares/require-auth';
    const myRoute = express.Router();

    myRoute.get('/api/items/purchase', curentUser, requireAuth, (req, res) =>{

        // if you reach here, it means the user is authenticated

    })
```

- How to get the current user information that is put in the session cookie?
  pass the **currentUser** middlewares to your route handler, and then you can access current user in request body. Example:

```js
    import express from 'express';
    import { currentUser } from '../../middlewares/current-user';
    const myRoute = express.Router();

    myRoute.get('/api/items/purchase', curentUser, (req, res) =>{

    console.log(req.body.currentUser);
    /** prints:
    {
        "status": 200,
        "message": "Sucess",
        "data": {
            "currentUser": {
                "email": "test2@test.com",
                "firstName": "test",
                "lastName": "user",
                "lat": 1.111,
                "lng": -1.111,
                "postalCode": "N6N 6N6",
                "isPremiumMember": false,
                "dislikedItemIds": [],
                "postedItems": [
                    "616e3e166a736fbdcebb3670",
                    "616e3ea40cd2b4bd16c195a4"
                ],
                "purchasedItems": [],
                "favouriteItems": [
                    "507f1f77bcf86cd799439011",
                    "507f1f77bcf86cd799439012"
                ],
                "iat": 1634616544,
                "exp": 1634618344
            }
        }
    }
    **/
})
```
