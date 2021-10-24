## Category Service

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
    errors: [
        {
            message: string,
            field?: string
        }
    ]
}
```

## Examples

**GET /api/categories - get all categories**

```
request {}

response OK:
{
    "status": "200",
    "message": "Success",
    "data": {
        "results": 3,
        "categories": [
            {
                "name": "Electronic",
                "createdAt": "10/07/2021",
                "updatedAt": "10/07/2021",
                "id": "615eb1af75d5c21aefb93b3f"
            },
            {
                "name": "Cars",
                "createdAt": "10/07/2021",
                "updatedAt": "10/07/2021",
                "id": "615eb1cd75d5c21aefb93b41"
            },
            {
                "name": "Computer",
                "createdAt": "10/07/2021",
                "updatedAt": "10/07/2021",
                "id": "615eb26375d5c21aefb93b4a"
            }
        ]
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

**POST /api/categories**

```
request
{
  "name": "Computer"
}

response OK:
{
    "status": "201",
    "message": "Category created successfully",
    "data": {
        "category": {
            "name": "Computer",
            "createdAt": "10/07/2021",
            "updatedAt": "10/07/2021",
            "id": "615eb26375d5c21aefb93b4a"
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

**PATCH /api/categories/{categoryId}**

```
request
{
  "name": "XYZ"
}

response OK:
{
    "status": "200",
    "message": "Category updated successfully",
    "data": {
        "category": {
            "name": "XYZ",
            "createdAt": "10/07/2021",
            "updatedAt": "10/07/2021",
            "id": "615eb2fe75d5c21aefb93b4d"
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

**DELETE /api/categories/{categoryId}**

```
request {}

response OK
{
    status: 200,
    message: 'Category deleted successfully',
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
