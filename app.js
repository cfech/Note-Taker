const fs = require('fs')
var express = require("express");
var path = require("path");
// var index = require("/public/assets/js/index.js")

var x = 1


// console.log(index)
// // var dbJson = require("db/db.json")

var app = express(); // runs an express server
var PORT = 3000; // its port

// notes array 
var notes = [


]

//Middle wear
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));






//Get routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});



app.get("/api/notes", function (req, res) {
    res.json(notes);;
});


// Post routes
app.post("/api/notes", function (req, res) {

    let newNote = req.body;
    console.log(newNote)

    newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();
    newNote.id = x++

    console.log(newNote);

    notes.push(newNote);

    res.json(newNote);
});



//delete function 
app.delete(`/api/notes/:id`, function (req, res) {

    var noteId = req.params.id;

    for (var i = 0; i < notes.length; i++) {
        console.log(noteId)
        console.log(notes[i].id)

        if (noteId == notes[i].id) {
            console.log(noteId)
            notes.splice(i, 1);
            console.log(notes)
        }
    }
    res.json(notes)
})


// app.get("/", function (req, res) {
//     res.json("home page");;
// });



// Listen 
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});