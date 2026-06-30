import express from 'express';
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const database = {
  users: [
    {
      id: '123',
      name: 'Jack',
      email: 'jack@gmail.com',
      password: '12345',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Jill',
      email: 'jill@gmail.com',
      password: 'abcde',
      entries: 0,
      joined: new Date(),
    },
  ]
}

app.listen(3000, () => {
  console.log('app is running on port 3000');
});

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (email === database.users[0].email && password === database.users[0].password) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;

  const newUser = {
    id: '125',
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  }

  database.push(newUser);
  res.json(newUser);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user)
    }
  });

  if(!found){
    res.status(400).json('not found');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(400).json('not found');
  }
});