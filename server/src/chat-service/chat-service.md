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

----------------How chat-service and its routes work----------------------------------------------------

If you want to create a chat, "POST - api/chat" is the route (create-chat.ts)

{"itemId":"61611f13841ec195d475565d",
"sender":"615d6c858882db424487b6ae",
"receiver":"615db35ce0dc99ab6c21a13c",
"messages":[{
"userId":"615db35ce0dc99ab6c21a13c",
"chat":"Helooooooo"
}]} //working example

If you want to update a single chat, "PATCH - api/chat/:chatId" is the route (update-chat.ts)

{"itemId":"61611f13841ec195d475565d",
"sender":"615d6c858882db424487b6ae",
"receiver":"615db35ce0dc99ab6c21a13c",
"messages":[{
"userId":"615db35ce0dc99ab6c21a13c",
"chat":"Helooooooo"
},
{
"userId":"615db35ce0dc99ab6c21a13c",
"chat":"Is this available?"
}]} //working example

If you want to get chat by userId, "GET - api/chat/user/:userId" is the route (get-chat-by-user.ts)
http://localhost:5000/api/chat/user/615db35ce0dc99ab6c21a13c //working example

If you want to get chat by chatId, "GET - api/chat/:chatId" is the route (get-chat-by-id.ts)
http://localhost:5000/api/chat/619361513f8db9a8d253c2d8 //working example

delete-all-chats.ts only used for deleting all chats (testing purpose only)

---

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
