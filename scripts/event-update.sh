#!/bin/bash

# startTime and endTime are not required
# questions will be populated with default value

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