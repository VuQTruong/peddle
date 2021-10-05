## Auth Service

* The auth service is responsible for signin, signup, signout functionalities. For user authentication, check the authentication section below to learn how to authenticate a user. 

* You don't need to worry about managing the jwt and session once signed in. The jwt and User information are stuffed in the session cookie when you sign in, and cleared when you sign out. Simply call the end points to create a session and you are good to go! The session is valid for 10 minutes for the current setup, or you can hit signout endpoint to signout manually.


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
    message: string
}
```
## Examples

**POST /api/auth/signin**
```
request
{
  "firstName" : "Tae Kwon",
  "lastName" : "Doe",
  "photo" : "base64 or other format",
  "email" : "test@test.com",
  "password" : "password",
  "lat" : 123,
  "lng" : 456,
  "postalCode" : "N6H 1A2",
  "isPremiumMember" : false,
  "dislikedItemIds" : []
}

response OK: 
{
    status: 200,
    message: "success"
}

response Error:
{
    status: 400,
    message: "bad request"
}
```

**POST /api/auth/signout**
```
request:
{}

response OK: 
{
  "firstName" : "Tae Kwon",
  "lastName" : "Doe",
  "photo" : "base64 or other format",
  "email" : "test@test.com",
  "password" : "password",
  "lat" : 123,
  "lng" : 456,
  "postalCode" : "N6H 1A2",
  "isPremiumMember" : false,
  "dislikedItemIds" : []
}

response Error:
{
    status: 400,
    message: "bad request"
}
```
**POST /api/auth/signup**
```
request
{
  "firstName" : "Tae Kwon",
  "lastName" : "Doe",
  "photo" : "base64 or other format",
  "email" : "test@test.com",
  "password" : "password",
  "lat" : 123,
  "lng" : 456,
  "postalCode" : "N6H 1A2",
  "isPremiumMember" : false,
  "dislikedItemIds" : []
}

response OK: 
{
    status: 200,
    message: "success"
}

response Error:
{
    status: 400,
    message: "bad request"
}
```
**GET /api/auth/currentuser**
```
{
    status:200,
    message:"success"
    data: {
        "firstName" : "Tae Kwon",
        "lastName" : "Doe",
        "photo" : "base64 or other format",
        "email" : "test@test.com",
        "password" : "password",
        "lat" : 123,
        "lng" : 456,
        "postalCode" : "N6H 1A2",
        "isPremiumMember" : false,
        "dislikedItemIds" : []
    }
}
```

### Authorization 
* How to use authentication middlewares to check if user's logged in?
pass the **currentUser** and **requireAuth** middlewares to your route handler. Example:
```
    import express from 'express';
    import { currentUser } from '../../middlewares/current-user';
    import { requireAuth } from '../../middlewares/require-auth';
    const myRoute = express.Router();

    myRoute.get('/api/items/purchase', curentUser, requireAuth, (req, res) =>{

        // if you reach here, it means the user is authenticated

    })
```

* How to get the current user information that is put in the session cookie?
pass the **currentUser** middlewares to your route handler, and then you can access current user in request body. Example:
```
    import express from 'express';
    import { currentUser } from '../../middlewares/current-user';
    const myRoute = express.Router();

    myRoute.get('/api/items/purchase', curentUser, (req, res) =>{

        console.log(req.body.currentUser);
        /** prints: 
            {
                firstName : "Tae Kwon",
                lastName : "Doe",
                photo : "base64 or other format",
                email : "test@test.com",
                password : "password",
                lat : 123,
                lng : 456,
                postalCode : "N6H 1A2",
                isPremiumMember : false,
                dislikedItemIds : []
            }
        **/
    })
```

