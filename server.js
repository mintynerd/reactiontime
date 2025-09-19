const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = './users.json';

// Helper to read/write users
function readUsers() {
    if (!fs.existsSync(USERS_FILE)) return {};
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}
function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Sign up
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const users = readUsers();
    if (users[username]) return res.status(400).json({ error: 'Username taken' });
    for (let u in users) if (users[u].email === email) return res.status(400).json({ error: 'Email taken' });
    users[username] = { email, password };
    writeUsers(users);
    res.json({ success: true });
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    if (!users[username] || users[username].password !== password)
        return res.status(400).json({ error: 'Invalid credentials' });
    res.json({ success: true });
});

// Forgot password (demo: just checks if email exists)
app.post('/forgot', (req, res) => {
    const { email } = req.body;
    const users = readUsers();
    for (let u in users) if (users[u].email === email) return res.json({ success: true });
    res.status(400).json({ error: 'Email not found' });
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));

node server.js