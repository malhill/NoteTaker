const fs = require("fs");
const express = require("express");
const { urlencoded } = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(urlencoded( { extended: true } ));
app.use(express.static("public"));

app.get("/notes", (request, response) => {
    response.sendFile(path.join(_dirname, "public", "notes.html"));
    console.log("Notes!")
})




