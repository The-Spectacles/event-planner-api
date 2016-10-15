#!/bin/bash

curl --include --request DELETE http://localhost:3000/events/$ID \
  --header "Authorization: Token token=$TOKEN"