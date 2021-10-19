## Item Service

### Response

```
SuccessStatus:
200 OK
201 Created
204 No Content

ErrorStatus:
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found

Success Response:
{
    status: SuccessStatusCode,
    message: string,
    data:{
        
    }
}

Failure Response:
{
    status: ErrorStatusCode
    message: string,
    errors: [
        {
            message: string
            field?: string
        }
    ]
}

```

## Examples

**`POST` /api/items - create new item**

```
request
{
    "name": "Test Item",
    "category": "Electronic",
    "images": ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
    "price": 13.99,
    "description": "Item Description"
    "postedBy": "a valid Mongo Id"
}

response OK:
{
    "status": "201",
    "message": "Item created successfully",
    "data": {
        "item": {
            "name": "Test Item",
            "category": "Electronic",
            "images": [
                "imageUrl_1",
                "imageUrl_2",
                "imageUrl_3"
            ],
            "price": 13.99,
            "description": "Item Description",
            "views": 0,
            "isActive": true,
            "isSold": false,
            "postedBy": "UserId",
            "createdAt": "10/06/2021",
            "updatedAt": "10/06/2021",
            "id": "ItemId"
        }
    }
}

response Error:
{
    status: 500,
    message: "Unexpected Error - ${err.message}",
    errors:[
        {
            message: "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`GET` /api/items/{itemId} - get an item by id**

```
request {}

response Ok:
{
    "status": 200,
    "message": "Success",
    "data": {
        "item": {
            "name": "Test Item",
            "category": "Electronic",
            "images": [
                "imageUrl_1",
                "imageUrl_2",
                "imageUrl_3"
            ],
            "price": 13.99,
            "description": "Item Description",
            "views": 0,
            "isActive": true,
            "isSold": false,
            "postedBy": {
                "firstName": "User First Name",
                "lastName": "User Last Name",
                "photo": "User photo",
                "lat": User's lat,
                "lng": User's long,
                "postedItems": [List of posted items' id],
                "id": "UserId"
            },
            "createdAt": "10/06/2021",
            "updatedAt": "10/06/2021",
            "id": "ItemId"
        }
    }
}

response Error:
{
    status: 404,
    message: "Item not found"
    errors: {
        message: "Item not found"
    }
}

response Error:
{
    status: 500,
    message: "Unexpected Error - ${err.message}"
    errors:[
        {
            message: "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`GET` /api/items - get multi items (10 by default)**

```
request {}

response Ok:
{
    "status": 200,
    "message": "Success",
    "data": {
        "items": [
            { ...item1 },
            { ...item2 },
            { ...item3 },
            { ...item4 },
            { ...item5 },
            { ...item6 },
            { ...item7 },
            { ...item8 },
            { ...item9 },
            { ...item10 },
        ]
    }
}

response Error:
{
    status: 500,
    message: "Unexpected Error - ${err.message}"
    errors:[
        {
            message: "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`DELETE` /api/items/{itemId} - delete an item by id**

```
request {}

response Ok:
{
    status: '200',
    message: 'Success',
}

response Error:
{
    status: 403,
    message: "You are not allowed to delete this item",
    errors:[
        {
            message: "You are not allowed to delete this item",
        }
    ]
}

response Error:
{
    status: 500,
    message: "Unexpected Error - ${err.message}"
    errors:[
        {
            message: "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`PATCH` /api/items/{itemId} - update an item by id**

```
request
{
    "name": "value",    // Optional
    "category": "value",    // Optional
    "images": ["value"],    // Optional
    "price": value,    // Optional
    "description": "value",    // Optional
    "isActive": true/false,    // Optional
    "isSold": true/false,    // Optional
}

response Ok:
{
    "status": "200",
    "message": "Item updated successfully",
    "data": {
        "item": {
            "name": "Updated Name",
            "category": "Electronic",
            "images": [
                "imageUrl_1",
                "imageUrl_2",
                "imageUrl_3"
            ],
            "price": 13.99,
            "description": "Item description",
            "views": 0,
            "isActive": true,
            "isSold": false,
            "postedBy": "User Id",
            "createdAt": "10/06/2021",
            "updatedAt": "10/06/2021",
            "id": "Item Id"
        }
    }
}

response Error:
{
    status: 403,
    message: "You are not allowed to update this item",
    errors: {
        message: "You are not allowed to update this item",
    }
}

response Error:
{
    status: 500,
    message: "Unexpected Error - ${err.message}", 
    errors:[
        {
            message: "Unexpected Error - ${err.message}",
        }
    ]
}
```
