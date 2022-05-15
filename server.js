const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const { json } = require('express/lib/response');
const { parse } = require('path');

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Setup the main button on index to work/send you to notes.
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html')
})

// Setup API routes
// GET reads the json file and gets all the data from it 
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
// POST will log all the collected data as a saved posted note on the page. 
app.post("/api/notes", (req, res) => {
    console.log("New note", req.body);
    //console.log(uniqid)

    //reading the JSON file 
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)
        //return us a JSON object to html page 
        const results = JSON.parse(data);

        const newNote = { ...req.body, id: uniqid() };
        //combine old and new notes 
        const combineAll = [...results, newNote]
        fs.writeFile('./db/db.json', JSON.stringify(combineAll), (err, datas) => {
            if (err) {
                return console.error(err);
            }
            console.log("File saved successfully!");

            //return the json 

            res.json(combineAll)
        });

    })
// DELETE will delete any given saved note on the page and it's data. 
app.delete("/api/notes/:id", (req, res) => {
    let noteRecall = JSON.parse(fs.readFileSync("./db/db.json"))
    let whichNote = (req.params.id).toString();

    noteRecall = noteRecall.filter(selectedNote => {
        return selectedNote.id != whichNote;
    })
    console.log(noteRecall)
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(noteRecall))
    res.json(noteRecall)
    })    
}); 

// Setup HTML routes
// GET /notes should return the `notes.html` file.
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