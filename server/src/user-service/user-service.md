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
  seenItems: string[];
  postedItems: string[];
  purchasedItems: string[];
  favouriteItems: string[];
}

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
        message: string,
        field?: string
      }  
    ]
}

```
# Examples

**`GET` /api/users/{userId} - get a user by id**

```json
request {}

response Ok:
{
    "status": "200",
    "message": "Success",
    "data": {
        "user": {
            "email": "test@test.com",
            "firstName": "Tae Kwon",
            "lastName": "Doe",
            "photo": "base64 or other format",
            "lat": 123,
            "lng": 456,
            "postalCode": "N5Y 2S1",
            "isPremiumMember": false,
            "dislikedItemIds": [],
            "postedItems": [
                "615db35ce0dc99ab6c21a13c",
                "615dc4630bebd86cbcc412c5"
            ],
            "purchasedItems": [],
            "favouriteItems": [
                "615dc4630bebd86cbcc412c5"
            ],
            "id": "615d6c858882db424487b6ae"
        }
    }
}

response Error:
{
    "status": 500,
    "message": "Unexpected Error - ${err.message}",
    "errors":[
        {
            "message": "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`GET` /api/users/post-items - get a user's posted items**

```json
request {}

response Ok:
{
    "status": "200",
    "message": "Success",
    "data": {
        "items": [
            {
                "isSold": false,
                "name": "Test Item",
                "category": "Electronic",
                "images": [
                    "imageUrl_1",
                    "imageUrl_2",
                    "imageUrl_3"
                ],
                "price": 13.99,
                "description": "Item Description",
                "views": 3,
                "isActive": true,
                "postedBy": "615d6c858882db424487b6ae",
                "createdAt": "10/06/2021",
                "updatedAt": "10/06/2021",
                "id": "615db35ce0dc99ab6c21a13c"
            },
            {
                ...item2
            }
        ]
    }
}

{
    "status": 500,
    "message": "Unexpected Error - ${err.message}",
    "errors":[
        {
            "message": "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`GET` /api/users/purchased-items - get a user's purchased items**

```json
request {}

response Ok:
{
    "status": "200",
    "message": "Success",
    "data": {
        "items": [
            {
                "isSold": false,
                "name": "Test Item",
                "category": "Electronic",
                "images": [
                    "imageUrl_1",
                    "imageUrl_2",
                    "imageUrl_3"
                ],
                "price": 13.99,
                "description": "Item Description",
                "views": 3,
                "isActive": true,
                "postedBy": "615d6c858882db424487b6ae",
                "createdAt": "10/06/2021",
                "updatedAt": "10/06/2021",
                "id": "615db35ce0dc99ab6c21a13c"
            },
            {
                ...item2
            }
        ]
    }
}

response Error:
{
    "status": 500,
    "message": "Unexpected Error - ${err.message}",
    "errors":[
        {
            "message": "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`GET` /api/users/favourite-items - get a user's favourite items**

```json
request {}

response Ok:
{
    "status": "200",
    "message": "Success",
    "data": {
        "results": 2,
        "items": [
            {
                "isSold": false,
                "name": "Test Item",
                "category": "Electronic",
                "images": [
                    "imageUrl_1",
                    "imageUrl_2",
                    "imageUrl_3"
                ],
                "price": 13.99,
                "description": "Item Description",
                "views": 3,
                "isActive": true,
                "postedBy": "615d6c858882db424487b6ae",
                "createdAt": "10/06/2021",
                "updatedAt": "10/06/2021",
                "id": "615db35ce0dc99ab6c21a13c"
            },
            {
                ...item2
            }
        ]
    }
}

response Error:
{
    "status": 500,
    "message": "Unexpected Error - ${err.message}",
    "errors":[
        {
            "message": "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`PATCH` /api/users/current-user - update user info**

``` json
request
{
    "firstName": "value",    // Optional
    "lastName": "value",    // Optional
    "photo": "value",    // Optional
    "lat": value,    // Optional
    "lng": value,    // Optional
    "postalCode": "valid Canadian postal code"    // Optional
}

response Ok:
{
    "status": "200",
    "message": "User updated successfully",
    "data": {
        "user": {
            "email": "test@test.com",
            "firstName": "Tae Kwon",
            "lastName": "Doe",
            "photo": "base64 or other format",
            "lat": 123,
            "lng": 456,
            "postalCode": "N5Y 2S1",
            "isPremiumMember": false,
            "dislikedItemIds": [],
            "postedItems": [
                "615db35ce0dc99ab6c21a13c",
                "615dc4630bebd86cbcc412c5"
            ],
            "purchasedItems": [],
            "favouriteItems": [
                "615dc4630bebd86cbcc412c5"
            ],
            "id": "615d6c858882db424487b6ae"
        }
    }
}

response Error:
{
    "status": 500,
    "message": "Unexpected Error - ${err.message}",
    "errors":[
        {
            "message": "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`PATCH` /api/users/seen-items - update user's seen items**

- Update seen item **_MUST_** be called after an item is passed to ensure the user will not get the item again

``` json
request
{
    "itemId": "SDKJ934kldf88234DFLK9ALKlsdkfj" //valid mongo id 
}

response Ok:
{
    "status": "200",
    "message": "Seen Items updated successfully",
}

response Error:
{
    "status": 400,
    "message": "User not found",
    "errors":[
        {
            "message": "User not found",
        }
    ]
}

response Error:
{
    "status": 500,
    "message": "Unexpected Error - ${err.message}",
    "errors":[
        {
            "message": "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`POST` /api/users/favourite - add an item to favourite list**

``` json
request
{
    "itemId": "value"
}

response Ok:
{
    "status": "200",
    "message": "Favourite Item added successfully",
}

response Error:
{
    "status": 400,
    "message": "User not found",
    "errors":[
        {
            "message": "User not found",
        }
    ]
}

response Error:
{
    "status": 500,
    "message": "Unexpected Error - ${err.message}",
    "errors":[
        {
            "message": "Unexpected Error - ${err.message}",
        }
    ]
}
```

**`DELETE` /api/users/favourite/{itemId} - delete an item to favourite list**

``` json
request{}

response Ok:
{
    "status": "200",
    "message": "Favourite Item removed successfully",
}

response Error:
{
    "status": 400,
    "message": "User not found",
    "errors":[
        {
            "message": "User not found",
        }
    ]
}

response Error:
{
    "status": 500,
    "message": "Unexpected Error - ${err.message}",
    "errors":[
        {
            "message": "Unexpected Error - ${err.message}",
        }
    ]
}
```
