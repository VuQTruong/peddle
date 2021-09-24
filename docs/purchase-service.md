# Purchase Service
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

## Examples 
### POST /api/purchase/{itemId}/buyer/{userId} - purchase an item
```
request
{
    ... to be determined
}

response OK
{
    status: 201,
    message: "success",
}
response Error
{
    status: 400,
    message: "invalid token"
}
```