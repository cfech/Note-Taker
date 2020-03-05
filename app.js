const fs = require('fs')
var express = require("express");
var path = require("path");

// var dbJson = require("db/db.json")

var app = express(); // runs an express server
var PORT = 3000; // its port

// notes array 
var notes = [{
    routeName: "1",
    name: "Title",
    content: "note contents",
    uniqueid: 1253
}]

//Middle wear
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Get routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


//have to do something with db json here?
app.get("/api/notes", function (req, res) {
    res.json(notes);;
});


// Post routes
app.post("/api/notes", function (req, res) {

    let newNote = req.body;

    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();

    console.log(newNote);

    notes.push(newNote);

    res.json(newNote);
});



//delete function 
// app.delete(`/api/notes/:id`, function(req , res){

//     var chosen = req.params.character;
  
//     console.log(chosen);
  
//     for (var i = 0; i < notes.length; i++) {
//       if (chosen === notes[i].routeName) {
//         return res.json(notes[i]);
//       }
//     }

// })


// app.get("/", function (req, res) {
//     res.json("home page");;
// });



// Listen 
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});