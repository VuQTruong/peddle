# Chat Service
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
Chat:
```
{
    ... to be determined
}
```

## Examples 

**GET /api/chat/{userId} - get chat history for a user**
```
response OK
{
    status: 201,
    message: "success",
    data:{
        chat: Chat
    }
}
response Error
{
    status: 401,
    message: "invalid token"
}
```

**PUT /api/chat/{userId} - update chat history for a user**
```
response OK
{
    status: 200,
    message: "success",
    data:{
        chat: Chat
    }
}
resopnse Error
{
    status: 404,
    message: "user not found"
}
```