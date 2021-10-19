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

**`DELETE` /api/images - delete an image**

```json
request
{
    "imageUrl": "image-url"
}

response OK:
{
    "status": "200",
    "message": "Success",
}

response Error:
{
    "status": "400",
    "message": "No Image Selected!"
}

{
    "status": "400",
    "message": "Invalid request - One or more field is invalid."
}
```
