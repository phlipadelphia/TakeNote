const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//setuop  API routes
//GET /notes` reads the json file and gets all the data from it 
app.get("/api/notes", (req, res) => {

    //reading the JSON file 
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)
    //return us a JSON object to html page 
        const results = JSON.parse(data); 
        console.log(results);

        res.json(results)
    })

});




//setuop   HTML routes
//GET /notes` should return the `notes.html` file.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// GET should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});


//listening to the express server 
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});