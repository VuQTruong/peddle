SuccessStatus:
```
200 OK
201 Created
```

ErrorStatus:
```
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
422 Unprocessable Entity
```

Success Response:
```
{
    status: SuccessStatusCode,
    message: string
}
```

Failure Response:
```
{
    status: ErrorStatusCode
    message: string
}
```
## Examples ##

POST /api/auth/signin
```
request
{
    email: "test@test.com",
    password: "password"
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

POST /api/auth/signout
```
request:
{}

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
POST | /api/auth/signup
```
request
{
    "firstName": "John",
    "lastName" : "Doe",
    "email": "test@test.com",
    "password": "password"
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
GET /api/auth/currentuser 
```
{
    status:200,
    message:"success"
    data: {
        User
    }
}
```

