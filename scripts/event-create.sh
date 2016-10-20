#!/bin/bash

# startTime and endTime are not required
# questions will be populated with default value

curl --include --request POST http://localhost:3000/events \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "event": {
      "title": "Bagel Party",
      "location": "GA Boston",
      "description": "Mmmm bagels",
      "date": "2016-10-15",
      "startTime": "2016-10-15T10:00:00",
      "endTime": "2016-10-15T13:00:00"
    }
  }'


curl --include --request POST http://localhost:3000/events \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "event": {
      "title": "Pizza Partay",
      "location": "Dominos",
      "description": "Mmmm pizza",
      "date": "2016-10-15",
      "startTime": "2016-05-18T16:00:00",
      "endTime": "2016-05-18T19:00:00"
    }
  }'
