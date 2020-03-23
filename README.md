# LibraryApp-Node

Simple library app with **Node + Express + MongoDB**

App: https://library-app-node-ndvo.herokuapp.com/

Cloud DB: Mongo DB Atlas

#### Project Overview

1. ISBN Search with fetch book data from Google Book API and show it in a card panel.
2. Click Borrow to POST new book to db.
3. Fetch all borrowing books data from DB to borrowing list.
4. Update borrowing book title, author, ... via UI


#### .env
create .env file that contains your MongoDB Atlas Password 

```
MONGODB_PASSWORD=YourMongoPassword
```

#### Run

dev : `npm run dev`

start: `npm run start`