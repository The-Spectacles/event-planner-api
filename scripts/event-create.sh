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
      "date": "2016-10-15"
    }
  }'


  curl --include --request POST http://localhost:3000/events \
    --header "Content-Type: application/json" \
    --header "Authorization: Token token=kGLwBSM9Q1Iu+PHrtnGXOqw3QbtbfI5XU9MR2PhyulI=--pvjcamMiR+gGGGdeE5PHExbJeKpW04yi1OVIGvIi+T0=" \
    --data '{
      "event": {
        "title": "Pizza Partay",
        "location": "Dominos",
        "date": "2016-10-15",
        "startTime": "2016-05-18T16:00:00",
        "endTime": "2016-05-18T19:00:00"
      }
    }'
