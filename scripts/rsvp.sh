#index

curl --include --request GET http://localhost:3000/rsvps \
  --header "Authorization: Token token=aj9fa4wOCRkNpCgcH9TYKPq98IuMpm0fw+va4NjLkQw=--j6Cm14HNfSPCy3cmzEmbficmie8s3zDBPuuxrP6uJ0Q="

#show

curl --include --request GET http://localhost:3000/rsvps/58029237eb8835c862669611 \
  --header "Authorization: Token token=$TOKEN"

#create

curl --include --request POST http://localhost:3000/rsvps \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=aj9fa4wOCRkNpCgcH9TYKPq98IuMpm0fw+va4NjLkQw=--j6Cm14HNfSPCy3cmzEmbficmie8s3zDBPuuxrP6uJ0Q=" \
  --data '{
    "rsvp": {
      "_event": "580299b5eb8835c862669613",
      "questions":
      [
        {
          "text": "Are you coming?",
          "answer": [ "YASSS" ]
        }
      ]
    }
  }'

#update

curl --include --request PATCH http://localhost:3000/rsvps/58029237eb8835c862669611 \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "rsvp": {
      "_event": "5802865deb8835c862669610",
      "title": "Bagel Party",
      "location": "GA Boston",
      "date": "2016-10-15",
      "questions":
      [
        {
          "text": "Are you coming?",
          "answer": [ "Yes" ]
        }
      ]
    }
  }'
