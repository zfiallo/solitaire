const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId; 
const DBNAME = "solitaire";

//Define Database URL
const dbURL = process.env.DB_URI || "mongodb://127.0.0.1";

//Define the database server
const client = new MongoClient(dbURL);

var services = function(app) {
    app.post('/index', async function(req, res) {
    
        var data = {
            //username: req.body.username,
            //password: req.body.password,


/*          bookTitle: req.body.bookTitle, 
            author: req.body.author, 
            publisher: req.body.publisher, 
            yearPublished: req.body.yearPublished, 
            isbn: req.body.isbn */

            // username, password, savedGame, personalBest
        };

        try {
            //Create a connection to database server
            const conn = await client.connect();

            //Create a database object
            const db = conn.db(DBNAME);

            //create a collection (table) object
            const coll = db.collection('users');

            //Insert the record into the table desired
            await coll.insertOne(data);

            //Clost the connection
            await conn.close();

            //Return success
            return res.status(200).send(JSON.stringify({msg:"SUCCESS"}));
        } catch(err) {
            //Close connection
            await client.close();
            
            //Return the error
            return res.status(201).send(JSON.stringify({msg:"Error" + err}));
        }
    });

    app.get('/index', async function(req, res) {
        
        try {
            const conn = await client.connect();
            const db = conn.db(DBNAME);
            const coll = db.collection('users');

            //Get data and put into an array
            const data = await coll.find().toArray();
            await conn.close();

            //Send success AND the data back to client
            return res.status(200).send(JSON.stringify({msg:"SUCCESS", game:data}));
        } catch(err) {
            await conn.close();
            return res.status(201).send(JSON.stringify({msg:"Error" + err}));
        }
            
    });


}

module.exports = services;