const fs = require("fs");
const express = require("express");
const { urlencoded } = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");
const { request } = require("http");
const { json } = require("body-parser");
const db = require('./db/db.json')

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/index.html"));
    console.log("Home!");
});

app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/notes.html"));
    console.log("Notes!");
});

app.get('/api/notes', (request, response) => {
    response.json(db);
    // if (err) throw err;

    // fs.readFile('db/db.json', 'utf8', (err, data) => {
    //     response.json(data);
    //     // console.log('get' + data);
    // });
});

app.post("/api/notes", (request, response) => {
    // fs.readFile('db/db.json', 'utf8', (err, data) => {
        // if (err) throw err;
        // console.log(data);

        const newNote = request.body;

        // let userNotes = JSON.parse(data);
        // let userNotes = response.json(JSON.parse(data));

        if(db.length == 0) {
            newNote.id=0;
        } else {
            newNote.id = parseInt(db[db.length - 1].id) + 1;
        }

        // newNote.id = parseInt(userNotes[userNotes.length - 1].id) + 1; // <---- Anthony was here!

        // console.log((userNotes[userNotes.length - 1].id) + 1);
        console.log(newNote);


        db.push(newNote);
        // console.log(userNotes);


        fs.writeFile('db/db.json', JSON.stringify(db), (err, data) => {
            if (err) throw err;
            // console.log(data);
        });

        response.send("note added");
        // console.log('Note Added!!!!!!!');

    });

app.delete("/api/notes/:id", (request, response) => {
    // fs.readFile('db/db.json', 'utf8', (err, data) => {
        // if (err) throw err;
        // console.log(data);

        // response.json(db);


        // const deleteNotes = JSON.parse(data);

        const deleteId = request.params.id;

        // console.log(deleteId);

        console.log(db);

        //.toString() Just in case we need this...
        for (let i = 0; i < db.length; i++) {
            console.log(db[i].id)
            if (deleteId == db[i].id) {
                db.splice(i, 1);
            };
        };



        fs.writeFile('db/db.json', JSON.stringify(db), (err, data) => {
            // if (err) throw err;
            // console.log(data);
        });

        response.send("note deleted");
    });

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});





