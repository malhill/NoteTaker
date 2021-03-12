// Require all the tools necessary!
const fs = require("fs");
const express = require("express");
const { urlencoded } = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");
const { request } = require("http");
const { json } = require("body-parser");

// base for the rest of the GET, POST, AND DELETE routes
app.use(urlencoded( { extended: true } ));
app.use(express.json());
app.use(express.static("public"));


// GET `/api/notes` - Should read the `db.json` file and return all saved notes as json.
app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/notes.html"));
    console.log("Notes!");
});

//Keeping this code for good practice. Related to line 10.
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/index.html"));
    console.log("Home!");
});

// Should read the `db.json` file
app.get('/api/notes', (request, response) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        response.json(data)
    }); 
});

// POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

// (1)Should receive a new note to save on the request body, add it to the `db.json`
app.post("/api/notes", (request, response) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);

        const newNote = request.body;

        let userNotes = JSON.parse(data);
        // let userNotes = response.json(JSON.parse(data));

        newNote.id = userNotes[userNotes.length-1];

        // console.log(userNotes);

        userNotes.push(newNote);

        // (2)and then return the new note to the client.
        fs.writeFile('db/db.json', JSON.stringify(userNotes), (err, data) => {
            if (err) throw err;
            console.log(data);
            // JSON.stringify(userNotes);
        });

        response.send("note added");
    });    
});

// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
app.delete("/api/notes/:id", (request, response) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);

        const deleteNotes = JSON.parse(data);
        // const deleteNotes = data;

        // (1) This means you'll need to find a way to give each note a unique `id` when it's saved.
        // const newNote = request.params.id.toString();
        // let userNotes = JSON.parse(data);
        const deleteId = request.params.id;
        //.toString() Just in case we need this...
        for (let i=0; i < deleteNotes.length; i++){
            if (deleteId === deleteNotes[i].id) {
            deleteNotes.splice(i, 1);
            };
        };
        // (2) In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property
        
        // (3) and then rewrite the notes to the `db.json` file.
        fs.writeFile('db/db.json', JSON.stringify(deleteNotes), (err, data) => {
            if (err) throw err;
            console.log(data);
        });

        response.send("note deleted");
    });
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

// In case db.json is erased!
// [
//     {
//         "title":"Test Title",
//         "text":"Test text",
//         "id":"0"
//     }
// ]




