var db = require("../db/db.json");
var fs = require("fs");

module.exports = function (app) {
  // API Request
  app.get("/api/notes", function (req, res) {
    // Read the db.json file and return all saved notes as JSON
    res.json(db);
  });

  // API POST Request
  app.post("/api/notes", function (req, res) {
    db.push(req.body);
    // Add unique id to each note
    db.forEach((obj, i) => {
      obj.id = i + 1;
    });
    // Return the new note
    fs.writeFile("./db/db.json", JSON.stringify(db), function () {
      res.json(db);
    });
  });

  // // API DELETE Request
  app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    db.splice(id - 1, 1);
    db.forEach((obj, i) => {
      obj.id = i + 1;
    });
    // Return the remaining notes
    fs.writeFile("./db/db.json", JSON.stringify(db), function () {
      res.json(db);
    });
  });
};