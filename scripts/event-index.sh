#!/bin/bash

curl --include --request GET http://localhost:3000/events \
  --header "Authorization: Token token=$TOKEN"
