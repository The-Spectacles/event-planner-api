#!/bin/bash

curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "username": "Bruce",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'

curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "another@example.email",
      "username": "Alfred",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
