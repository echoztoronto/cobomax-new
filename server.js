const log = console.log;

const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '1mb', extended: true }));
app.use(bodyParser.json({limit: '1mb', extended: true}));

// Mongo and Mongoose
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');

// Collections
const { Events } = require('./models/events');
const { Accounts } = require('./models/accounts');
const { Image } = require("./models/image");

// multipart middleware
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'echoztoronto',
    api_key: '686851499627752',
    api_secret: 'iNjSlakZNJxnHt3cMPjuAbSIs7A'
});

// add an image
app.post("/images", multipartMiddleware, (req, res) => {

  cloudinary.uploader.upload(
      req.files.image.path, 
      function (result) {
        const img = new Image({
            image_id: result.public_id, 
            image_url: result.url, 
            created_at: new Date(),
        });
        img.save().then(
            saveRes => {
              res.send(saveRes);
            },
            error => {
                res.status(400).send(error); 
            }
        );
    });
});


// get all events
app.get('/events', (req, res) => { 
	Events.find().then(
    events => {
      res.send(events);
    },
    error => {
      res.status(500).send(error);
    }
  )
}); 

// add an event
app.post('/event', (req, res) => {
    const event = new Events(req.body)
    event.save().then(
      result => {
        res.send(result)
      }, 
      error => {
        if (isMongoError(error)) { 
          res.status(500).send('Internal server error')
        } else {
          res.status(400).send('Bad Request') 
        }
      }
    )
})

// delete an event
app.delete('/event/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()  
		return;  
	}

  Events.deleteOne({_id: id}).then(
    result => {
      res.send(result);
    },
    error => {
      res.status(500).send(error);
    }
  )
})

app.patch('/event/:id',  (req, res) => {
	const id = req.params.id

  Events.findOne({ _id: id}).then(
    event => {
      if(!event) {
        res.status(404).send({message: "failed"})
      } else {
        for (const [key, value] of Object.entries(req.body)) {
          event[key] = value
        }
        event.save().then(
          result => {
            res.send({message: "success"})
          },
          error => {
            res.status(500).send(error);
          }
        )
      }
    }, 
    error => {
      if (isMongoError(error)) { 
        res.status(500).send('Internal server error')
      } else {
        res.status(400).send('Bad Request') 
      }
    }
  )
})

// admin verify
app.post('/adminVerify', (req, res) => {
  const username = req.body.username
	const password = req.body.password

  Accounts.findOne({username: username, password: password}).then(
    result => {
      if(!result) {
        res.status(404).send({message: "failed"})
      } else {
        res.send({message: "verified"})
      }
    }, 
    error => {
      if (isMongoError(error)) { 
        res.status(500).send({message: "Internal server error"})
      } else {
        res.status(400).send({message: "Bad Request"}) 
      }
    }
  )
})


app.use(express.static(__dirname + "/client/build"));

const port = process.env.PORT || 5000; 
app.listen(port, () => log(`Listening on port ${port}`)); 