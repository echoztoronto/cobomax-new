## Stacks
MERN(MongoDB, Express, React, Node)
Material UI, react-bootstrap, Fullcalendar, Cloudinary

## Setup
```
# create and run local Mongo database in the root directory of the repo
mkdir mongo-data
mongod --dbpath mongo-data
```

Then, in the root directory of the repo, run:
```
# install server dependencies in the root directory
npm install

# install frontend dependencies in the client directory
cd client
npm install
```

## Development

```
# build the React app
cd client
npm run build

# go back to the root directory
cd ..

# run the server
node server.js
```
