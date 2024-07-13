const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abhinav08',
    database: 'contact_form_db'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;
    const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, email, subject, message], (err, result) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.send('Form submitted successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
