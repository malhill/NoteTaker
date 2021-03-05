const fs = require("fs");
const express = require("express");
const { urlencoded } = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");

app.use(express.json());
app.use(urlencoded( { extended: true } ));
app.use(express.static("public"));

app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/notes.html"));
    console.log("Notes!");
});

//Keeping this code for good practice. Related to line 10.
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/index.html"));
    console.log("Home!");
});


// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (request, response) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        response.json(JSON.parse(data));
        console.log(data);
    }); 
});

// POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.get('/api/notes', (request, response) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        response.json(JSON.parse(data));
        console.log(data);
    }); 
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});




