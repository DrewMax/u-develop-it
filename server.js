const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const PORT = process.env.PORT || 3001;
const app = express();

// app.get(`/`, (req, res) => {
//     res.json({
//         message: 'Hello all you happy people!'
//     })
// })
// express midware
app.use(express.urlencoded({ extended: false }));

// connect to database
const db = new sqlite3.Database('./db/seeds.sql', err => {
    if (err) {
        return console.log('err.message');
    }
    console.log('Connected to the election database.')
})
app.use(express.json());

// GET a single candidate
app.get('./api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates
            WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: row
        })
    })
})

//create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            VALUES (?, ?, ?, ?)`;
const params = [];
//ES5 function not arrow function to use this
db.run(sql, params, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log(result, this.lastID);
})

//Delete a candidate 
app.delete("/api/candidate/:id", (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    db:run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }

        res.json({
            message: 'sucessfully deleted',
            changes: this.changes
        });
    });
})

//Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: "success",
            data: rows
        })
    })
})
 
// default response for any other request(Not Found- boo for you) Catch all
app.use((req, res) => {
    res.status(404).end();
})

//start server after DB connection 
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
})
    