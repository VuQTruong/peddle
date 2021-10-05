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
```
User:
```
{
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
  password: string;
  lat: number;
  lng: number;
  postalCode: string;
  isPremiumMember: boolean;
  dislikedItemIds: string[];
}
```

# Examples ##
**POST /api/users - add a new user**
```
request
{
    user: {
        User
    }
}
response OK
{
    status: 201,
    message: "success",
    data:{
        user: User
    }
}
response Error
{
    status: 400,
    message: "invalid token"
}
```

**GET /api/users/{userId} - get a user profile**
```
response OK
{
    status: 200,
    message: "success",
    data:{
        user: User
    }
}
resopnse Error
{
    status: 404,
    message: "user not found"
}
```

**GET  /api/users/{userId}/posts - get posted items for a user**
```
response OK
{
    status: 200,
    message: "success",
    data:{
        items: [
            Item...
        ]

    }
}
response Error
{
    status: 401,
    message: "account is suspended"
}
```
**GET /api/users/{userId}/purchasedItem - get purchased history for a user**
```
response OK
{
    status: 200,
    message: "success",
    data: {
        purchasedItems: [
            Item...
        ]
    }
}
response Error
{
    status: 404,
    message: "account not found"
}
```

**PUT  /api/users/{userId} - update user info**
```
request 
{
    user: {
        User
    }
}
response OK
{
    status: 200,
    message: "success",
    data: {
        user: User
    }
}
response Error
{
    status: 400,
    message: "unexpected error"
}
```
