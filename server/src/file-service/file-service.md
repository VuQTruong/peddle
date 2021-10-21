## File Service

## Examples

**`POST` /api/images - upload images**

There are two ways to send images

```js
const formData = new FormData();
formData.append('file', image);

await axios.post('/api/images', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
```

```html
<form action="/api/images" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
</form>
```

```json
response OK:
{
    "status": "200",
    "message": "success",
    "data": {
        "images": [
            image-url-1,
            image-url-2,
            ...
        ]
    }
}

response Error:
{
    "status": "400",
    "message": "File extension is not supported!"
}

{
    "status": "400",
    "message": "Unexpected field"
}

{
    "status": "400",
    "message": "File too large"
}

{
    "status": "400",
    "message": "No Image Attached"
}
```

**`DELETE` /api/images/:imageName - delete an image**

- What is `imageName` param?
  - Example image URL: https://res.cloudinary.com/dz4cswhcz/image/upload/v1634673435/ahl0n5smdagavmwnl2fa.jpg
  - `imageName = ahl0n5smdagavmwnl2fa`
  - Request to `/api/images/ahl0n5smdagavmwnl2fa`

```json
request {}

response OK:
{
    "status": "200",
    "message": "Success",
}

response Error:
{
    "status": "500",
    "message": "Something went wrong"
}
```
