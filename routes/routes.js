const fs = require('fs');
const path = require('path');

module.exports = app => {
    // create a variable for notes JSON
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        // html routes; default to index.html
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        // route to html notes page
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });

        // api routes
        // GET /api/notes to get all current notes
        app.get('/api/notes', (req, res) => {
            // return the db.json file
            res.json(notes);
        });

        // GET /api/notes/:id to get a specific note via id number
        app.get('/api/notes/:id', (req, res) => {
            res.json(notes[req.params.id]);
        });

        // POST /api/notes to add a new note to the db
        app.post('/api/notes', (req, res) => {
            let inputNote = req.body;
            notes.push(inputNote);
            updateNotes();
            console.log (`Added a new note: ${inputNote.title}`);
        });

        // DELETE /api/notes/:id to delete a specific note via id number
        app.delete('/api/notes/:id', (req, res) => {
            notes.splice(req.params.id, 1);
            updateNotes();
            console.log(`Note deleted with id ${req.params.id}`);
        });

        // function to update the notes json whenever there is a POST or DELETE
        updateNotes = () => {
            fs.writeFile('../db/db.json', JSON.stringify(notes), err => {
                if (err) throw err;
                return true;
            });
        }
    });
};