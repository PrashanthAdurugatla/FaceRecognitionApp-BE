const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');



const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
    client: 'pg',
    connection: {
        connectionString : 'process.env.DATABASE_URL',
        ssl:true,
    }
});



const app =express();
app.use(cors());

/*Need to parse when receiving data from FrontEnd*/
app.use(express.json());


app.get('/',(req, res) => {res.send(`It's Working!!!`)})

/*
Dependency injection we are injecting whatever dependency function needs
*/

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log('app is running on port 3000');
})



/* EndPoints --- Routes
/ -->res = this is working
/signin --> POST = success/fail
/register --> POST =New USER
/profile/:userId --> GET == user object
/image --> PUT == user object (update Score)
*/