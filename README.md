# Event Planner API

## API

Scripts are included in [`scripts`](scripts) to test actions.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| DELETE | `/sign-out/:id`        | `users#signout`   |

#### POST /sign-up

Request:

```sh
curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "username" : "Robin",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
```

```sh
scripts/sign-up.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "__v": 0,
    "updatedAt": "2016-10-15T18:37:02.637Z",
    "createdAt": "2016-10-15T18:37:02.637Z",
    "email":"an@example.email", 
    "username":"Robin", 
    "_id":"1"
  }
}
```

#### POST /sign-in

Request:

```sh
curl --include --request POST http://localhost:3000/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
```

```sh
scripts/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "_id": "1",
    "updatedAt": "2016-10-15T18:38:40.496Z",
    "createdAt": "2016-10-15T18:37:02.637Z",
    "email": "an@example.email",
    "username": "Robin",
    "token": "33ad6372f795694b333ec5f329ebeaaa",
    "__v": 0
  }
}
```

#### PATCH /change-password/:id

Request:

```sh
curl --include --request PATCH http://localhost:3000/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/change-password.sh
```

Response:

```md
HTTP/1.1 200 OK
```

#### DELETE /sign-out/:id

Request:

```sh
curl --include --request DELETE http://localhost:3000/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/sign-out.sh
```

Response:

```md
HTTP/1.1 200 OK
```

### Users

| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | `/users`    | `users#index`     |
| GET  | `/users/:id`  | `users#show`      |

#### GET /users

Request:

```sh
curl --include --request GET http://localhost:3000/users \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/users.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "users": [
    {
      "id": 2,
      "email": "another@example.email"
    },
    {
      "id": 1,
      "email": "an@example.email"
    }
  ]
}
```

#### GET /users/:id

Request:

```sh
curl --include --request GET http://localhost:3000/users/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=2 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/user.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 2,
    "email": "another@example.email"
  }
}
```

### Events

| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | `/events`    | `events#index`     |
| GET  | `/events/:id`  | `events#show`      |
| GET | `/my-events` | `events#myevents` |
| POST  | `/events`  | `events#create`      |
| PATCH  | `/events/:id`  | `events#update`      |
| DELETE  | `/events/:id`  | `events#destroy`      |

#### GET /events

Gets all events that the current user does not own and to which the current user has not already RSVP-ed.

Request:
```sh
curl --include --request GET http://localhost:3000/events \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/event-index.sh
```

Response: 
```md
{
  "events": [
    {
      "_id": "580280b22b4c41285571bc2f",
      "updatedAt": "2016-10-15T19:28:38.885Z",
      "createdAt": "2016-10-15T19:17:06.555Z",
      "title": "Even Better Bagel Party",
      "location": "GA Boston",
      "description": "Mmmm bagels",
      "date": "2016-10-16T00:00:00.000Z",
      "startTime": "2016-05-18T16:00:00.000Z",
      "endTime": "2016-05-18T19:00:00.000Z",
      "_owner": "5802774e25d55121d3948041",
      "__v": 0,
      "questions": [
        {
          "text": "Are you coming?",
          "options": ["Yes","No","Maybe"]
        }
      ],
      rsvps: [],
      "id":"580280b22b4c41285571bc2f"
    },
    {
      "_id": "580280b22b4c41285571bc30",
      "updatedAt": "2016-10-16T19:28:38.885Z",
      "createdAt": "2016-10-16T19:17:06.555Z",
      "title": "Pizza Party",
      "location": "GA Boston",
      "description": "Mmmm pizza",
      "date": "2016-10-31T00:00:00.000Z",
      "startTime": "2016-05-18T16:00:00.000Z",
      "endTime": "2016-05-18T19:00:00.000Z",
      "_owner": "5802774e25d55121d3948041",
      "__v": 0,
      "questions": [
        {
          "text": "Are you coming?",
          "options": ["Yes","No","Maybe"]
        }
      ],
      rsvps: [],
      "id":"580280b22b4c41285571bc30"
    },
  ]
}
```

#### GET /events/:id

Request:
```sh
curl --include --request GET http://localhost:3000/events/$ID \
  --header "Authorization: Token token=$TOKEN"
``` 
```sh
ID=58 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/event-show.sh
```

Response:
```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "event": {
    "_id": "580280b22b4c41285571bc2f",
    "updatedAt": "2016-10-15T19:28:38.885Z",
    "createdAt": "2016-10-15T19:17:06.555Z",
    "title": "Even Better Bagel Party",
    "location": "GA Boston",
    "date": "2016-10-16T00:00:00.000Z",
    "startTime": "2016-05-18T16:00:00.000Z",
    "endTime": "2016-05-18T19:00:00.000Z",
    "_owner": "5802774e25d55121d3948041",
    "__v": 0,
    "questions": [
      {
        "text": "Are you coming?",
        "options": ["Yes","No","Maybe"]
      }
    ],
    rsvps: [],
    "id": "580280b22b4c41285571bc2f"
  }
}
```

#### GET /my-events

Request:
```sh
curl --include --request GET http://localhost:3000/my-events \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/my-events.sh
```

Response: 
```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "events": [
    {
      "_id": "580280b22b4c41285571bc2f",
      "updatedAt": "2016-10-15T19:28:38.885Z",
      "createdAt": "2016-10-15T19:17:06.555Z",
      "title": "Donut Party",
      "location": "GA Boston",
      "date": "2016-10-31T00:00:00.000Z",
      "startTime": "2016-05-18T16:00:00.000Z",
      "endTime": "2016-05-18T19:00:00.000Z",
      "_owner": "5802774e25d55121d3948041",
      "__v": 0,
      "questions": [
        {
          "text": "Are you coming?",
          "options": ["Yes","No","Maybe"]
        }
      ],
      "id":"580280b22b4c41285571bc2f"
    },
    {
      "_id": "580280b22b4c41285571bc30",
      "updatedAt": "2016-10-16T19:28:38.885Z",
      "createdAt": "2016-10-16T19:17:06.555Z",
      "title": "Pizza Party",
      "location": "GA Boston",
      "date": "2016-10-31T00:00:00.000Z",
      "startTime": "2016-05-18T16:00:00.000Z",
      "endTime": "2016-05-18T19:00:00.000Z",
      "_owner": "5802774e25d55121d3948041",
      "__v": 0,
      "questions": [
        {
          "text": "Are you coming?",
          "options": ["Yes","No","Maybe"]
        }
      ],
      "id":"580280b22b4c41285571bc30"
    },
  ]
}

```

#### POST /events

Request:
```sh
curl --include --request POST http://localhost:3000/events \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "event": {
      "title": "Bagel Party",
      "location": "GA Boston",
      "description": "Mmmm bagels",
      "date": "2016-10-18"
      "startTime": "2016-10-18T16:00:00",
      "endTime": "2016-10-18T19:00:00",
    }
  }'
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/event-create.sh
```

Response from POST: 

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "event": {
    "__v": 0,
    "updatedAt": "2016-10-15T19:17:06.555Z",
    "createdAt": "2016-10-15T19:17:06.555Z",
    "title": "Bagel Party",
    "location": "GA Boston",
    "description": "Mmmm bagels",
    "date": "2016-10-18T00:00:00.000Z",
    "startTime": "2016-10-18T16:00:00.000Z",
    "endTime": "2016-10-18T19:00:00.000Z",
    "_owner": "5802774e25d55121d3948041",
    "_id": "580280b22b4c41285571bc2f",
    "questions": [
      {
        "options": ["Yes","No","Maybe"],
        "text": "Are you coming?"
      }
    ],
    "id": "580280b22b4c41285571bc2f"
  }
}
```

#### PATCH /events/:id

Request:
```sh
curl --include --request PATCH http://localhost:3000/events/$ID \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "event": {
      "title": "Even Better Bagel Party",
      "location": "GA Boston",
      "date": "2016-10-16"
    }
  }'
```

```sh
ID=58 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/event-create.sh
```

Response:
```md
HTTP/1.1 200 OK
```

#### DELETE /events/:id

Request:
```sh 
curl --include --request DELETE http://localhost:3000/events/$ID \
  --header "Authorization: Token token=$TOKEN"
``` 

```sh
ID=58 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/event-destroy.sh
```

Response: 
```md
HTTP/1.1 200 OK
```

### RSVPs

| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | `/rsvps`    | `rsvps#index`     |
| GET  | `/rsvps/:id`  | `rsvps#show`      |
| POST  | `/rsvps`  | `rsvps#createorupdate`      |

#### GET /rsvps

Request: 
```sh 
curl --include --request GET http://localhost:3000/rsvps \
  --header "Authorization: Token token=$TOKEN"
```sh 

Response:
```md
{
  "rsvps": [
    { 
      "_id": "5806bbc72213ea4a41769390",
      "_event": "580652be8a9ea3e414ceaca7",
      "_owner": "5806bbc1f8d026055deb4568",
      "createdAt": "2016-10-19T00:18:15.470Z",
      "endTime":"2017-10-10T10:21:00.000Z", 
      "startTime":"2017-10-10T10:11:00.000Z",
      "date": "2017-10-10T00:00:00.000Z",
      "location": "Cool party place",
      "title": "Cool party",
      "updatedAt": "2016-10-19T00:18:15.470Z",
      "questions": [
        {
          "options": "Yes",
          "text": "Are you coming?"
        }
      ],
      "id": "5806bbc72213ea4a41769390"
    },
    {
      "_id": "5806bbcd2213ea4a41769391",
      "_event": "5806ac2fb26af00318e8a96c",
      "_owner": "5806bbc1f8d026055deb4568",
      "createdAt": "2016-10-19T00:18:21.222Z",
      "endTime": "2016-10-15T14:01:00.000Z",
      "startTime": "2016-10-15T13:01:00.000Z",
      "date": "2016-10-15T00:00:00.000Z",
      "location": "Another cool party place",
      "title": "Another cool party",
      "updatedAt": "2016-10-19T00:18:21.222Z",
      "questions": [
        {
          "options": "Yes",
          "text": "Are you coming?"
        }
      ],
      "id": "5806bbcd2213ea4a41769391"
    }
  ]
}
```

#### GET /rsvps/:id

Request: 
```sh 
curl --include --request GET http://localhost:3000/rsvps/$ID \
  --header "Authorization: Token token=$TOKEN"
```sh 

Response:
```md
{
  "rsvp": {
    "_id": "5806bbc72213ea4a41769390",
    "_event": "580652be8a9ea3e414ceaca7",
    "_owner": "5806bbc1f8d026055deb4568",
    "createdAt": "2016-10-19T00:18:15.470Z",
    "endTime":"2017-10-10T10:21:00.000Z", 
    "startTime":"2017-10-10T10:11:00.000Z",
    "date": "2017-10-10T00:00:00.000Z",
    "location": "Cool party place",
    "title": "Cool party",
    "updatedAt": "2016-10-19T00:18:15.470Z",
    "questions": [
      {
        "options": "Yes",
        "text": "Are you coming?"
      }
    ],
    "id": "5806bbc72213ea4a41769390"
  }
}
```

#### POST /rsvps

Sending a POST request to `/rsvps` creates a new RSVP if no RSVP exists for the current for the specified event. If a matching RSVP already exists, the request updates that RSVP.

Request:
```sh
curl --include --request POST http://localhost:3000/rsvps \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "rsvp": {
      "_event": "$EVENT",
      "questions":
      [
        {
          "text": "Are you coming?",
          "options": "Yes"
        }
      ]
    }
  }'
```

Response (for a newly created RSVP): 
```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "rsvp": {
    "ok": 1,
    "nModified": 0,
    "n": 1,
    "upserted": [
      {
        "index": 0,
        "_id": "580809352213ea4a4176939c"
      }
    ]
  }
}
```

Response (for an updated RSVP): 
```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "rsvp": {
    "ok": 1,
    "nModified": 1,
    "n": 1
  }
}
```


## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3.
