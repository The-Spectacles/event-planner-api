#!/bin/bash

curl --include --request GET http://localhost:3000/events/$ID \
  --header "Authorization: Token token=$TOKEN"