const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

// app.get(`/`, (req, res) => {
//     res.json({
//         message: 'Hello all you happy people!'
//     })
// })
// express midware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// default response for any other request(Not Found- boo for you) Catch all
app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});