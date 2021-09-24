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

Item:
```
{
    ... to be determined
}
```

## Examples ##

**GET /api/items - get all items on the market**
```
response OK: 
{
    status: 200,
    message: "success",
    data: {
        items: {
            Item...
        }
    }
}

response Error:
{
    status: 400,
    message: "bad request"
}
```

**POST /api/items - post an item on the market for a user**
```
request:
{
    item: Item
}

response OK: 
{
    status: 200,
    message: "success"
}

response Error:
{
    status: 403,
    message: "exceed maximum posing limit"
}
```

**PUT /api/items/{itemId} - update an item on the market**
```
request
{
    item: Item
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

**DELETE /api/items/{itemId} - delete an item on the market**
```
request:
{

}

response OK:
{
    status:200,
    message:"success"
    data: {
        User
    }
}

response Error:
{
    status: 404,
    message: "item not found"
}
```

