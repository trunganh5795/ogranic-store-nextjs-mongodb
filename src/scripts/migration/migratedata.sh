#!/bin/bash
echo "please enter password: "
read password
mongoimport --uri mongodb+srv://nonameex2:$password@ogranicstore.pek7sfr.mongodb.net/ogranicstore --collection posts --type json --file posts.json
mongoimport --uri mongodb+srv://nonameex2:$password@ogranicstore.pek7sfr.mongodb.net/ogranicstore --collection orders --type json --file orders.json
mongoimport --uri mongodb+srv://nonameex2:$password@ogranicstore.pek7sfr.mongodb.net/ogranicstore --collection products --type json --file products.json
mongoimport --uri mongodb+srv://nonameex2:$password@ogranicstore.pek7sfr.mongodb.net/ogranicstore --collection users --type json --file users.json
