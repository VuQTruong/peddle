[![test](https://github.com/SionYoung/peddle/actions/workflows/integrate.yml/badge.svg)](https://github.com/SionYoung/peddle/actions/workflows/integrate.yml)

## Peddle Inc.

---

## Table of Contents
- [Introduction](#introduction)
- [Installing](#installing)
- [Running the app](#running-the-app)
- [APIs Overview](#apis-overview)
	- [Auth Service](#auth-service)
	- [User Service](#user-service)
	- [Item Service](#item-service)
	- [Purchase Service](#purchase-service)
	- [Chat Service](#chat-service)
	- [Category Service](#category-service)

---

## Introduction

<a href='https://www.youtube.com/watch?v=ZuK0LSJSYA4'>
	<img src='intro-thumbnail.jpg' alt='Peddle Inc. Intro' />
</a>

---

## Installing

Execute these commands from the project directory

```
cd peddle_client/ && npm install
```

```
cd server/ && npm install
```

---

## Running the app

Open a terminal on server directory

```
npm run dev
```

And open another terminal on peddle_client directory

```
npm start
```

---

## APIs Overview

### Auth Service

| Method | Route | Description |
|---|---|---|
| POST | /api/auth/signin      | user sign in     |
| POST | /api/auth/signout     | user sign out    |
| POST | /api/auth/signup      | add a new user to db and then automatically sign in |
| GET  | /api/auth/current-user | get current user object |


### User Service
| Method | Route | Description |
|---|---|---|
| GET  | /api/users/:userId        | get a user by id |
| GET  | /api/users/post-items      | get listed items for current user |
| GET  | /api/users/purchased-items | get purchased items for current user |
| PUT  | /api/users/current-user    | update current user's info  |
| GET  | /api/users/favourite-items | get current user's favourite items |
| POST | /api/users/favourite       | add an item to user's favourite item list |
| GET  | /api/users/seen-items      | get current user's seen items |
| PATCH | /api/users/seen-items     | update to user's seen item list |

### Item Service
| Method | Route | Description |
|---|---|---|
| GET    | /api/items          | get 10 items on the market            |
| GET    | /api/items/:itemId | get one specific item on the market   |
| POST   | /api/items          | post an item on the market for a user |
| PATCH    | /api/items/:itemId | update an item on the market        |
| DELETE | /api/items/:itemId | delete an item on the market          |

### Purchase Service
| Method | Route | Description |
|---|---|---|
| POST | /api/purchase/:itemId | purchase an item |

### Chat Service
| Method | Route | Description |
|---|---|---|
| GET | /api/chat/:userId | get chat history for a user |
| PUT | /api/chat/:userId | update chat history for a user |
| POST| /api/chat/:userId | create a new chat

### Category Service
| Method | Route | Description |
|---|---|---|
| GET | /api/categories | get all categories |
| PATCH | /api/categories/:categoryId | update a category name |
| POST| /api/categories | create a new category    
| DELETE| /api/categories/:categoryId | delete a category   