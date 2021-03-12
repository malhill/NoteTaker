const fs = require("fs");
const express = require("express");
const { urlencoded } = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");
const { request } = require("http");
const { json } = require("body-parser");

app.use(urlencoded( { extended: true } ));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/notes.html"));
    console.log("Notes!");
});

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/index.html"));
    console.log("Home!");
});

app.get('/api/notes', (request, response) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        response.json(data)
    }); 
});

app.post("/api/notes", (request, response) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);

        const newNote = request.body;

        let userNotes = JSON.parse(data);
        // let userNotes = response.json(JSON.parse(data));

        newNote.id = userNotes[userNotes.length-1];

        console.log(userNotes);

        userNotes.push(newNote);

        fs.writeFile('db/db.json', JSON.stringify(userNotes), (err, data) => {
            if (err) throw err;
            console.log(data);
        });

        response.send("note added");
    });    
});

app.delete("/api/notes/:id", (request, response) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);

        const deleteNotes = JSON.parse(data);

        const deleteId = request.params.id;

        //.toString() Just in case we need this...
        for (let i=0; i < deleteNotes.length; i++){
            if (deleteId === deleteNotes[i].id) {
            deleteNotes.splice(i, 1);
            };
        };
        
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




