const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@email.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()

        },
        {
            id: '1234',
            name: 'Sally',
            email: 'sallz@email.com',
            password: 'apple',
            entries: 0,
            joined: new Date()

        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@email.com'
        }
    ]
}

app.get('/', (req, res) => {
    // res.send('This is working!');
    res.json(database.users);
});

//SIGNIN
app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
       req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.json('error logging in');
    }
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        } 
    });
    if(!found) {
        res.status(404).json('not found');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    });
    if(!found) {
        res.status(404).json('not found');
    }
});

app.listen(3000, () => {
    console.log('App is running on port 3000.');
});





/**
 * /--> res = this is working
 * /signin --> POST = success/fail
 * /register --> POST = user
 * /profile/:userId --> GET = user
 * /image --> PUT --> user
 */