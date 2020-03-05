//Required node packages 
const fs = require('fs')
const express = require("express");
const path = require("path");

//Output path
const OUTPUT_DIR = path.resolve(__dirname, "db")
const outputPath = path.join(OUTPUT_DIR, "db.json");

//Id variable
var x = 1

//Setting the express package and port number 
var app = express(); 
var PORT = process.env.PORT || 3000; 

 //Middle wear
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
const notes = require("./db/db.json")

//Get routes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.json(notes);;
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Post routes
app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();
    newNote.id = x++
    notes.push(newNote);
    fs.writeFile(outputPath, JSON.stringify(notes), function (err) {
        if (err) {
            throw err
        }
    })
    res.json(newNote);
});

//delete function 
app.delete(`/api/notes/:id`, function (req, res) {
    var noteId = req.params.id;
    for (var i = 0; i < notes.length; i++) {
        if (noteId == notes[i].id) {
            notes.splice(i, 1);
           
            fs.writeFile(outputPath, JSON.stringify(notes), function (err) {
                if (err) {
                    throw err
                } 
            })
        }
    }
    res.json(notes)
})

// Listen function
app.listen(PORT, function () {});