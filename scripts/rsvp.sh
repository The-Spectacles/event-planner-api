#index

curl --include --request GET http://localhost:3000/rsvps \
  --header "Authorization: Token token=$TOKEN"

#show

curl --include --request GET http://localhost:3000/rsvps/$ID \
  --header "Authorization: Token token=$TOKEN"

#create or update 

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
          "answer": [ "YASSS" ]
        }
      ]
    }
  }'