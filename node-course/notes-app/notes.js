const fs = require("fs");

const getNotes = () => "Your notes...";

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;
  
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title taken!");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  
  if (notes.length > notesToKeep.length) {
    console.log("Note removed!");
    saveNotes(notesToKeep);
  } else {
    console.log("No note found!");
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log("Your notes");
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title); 
  if (note) {
    console.log(note.title);
    console.log(note.body);
  } else {
    console.log("Note not found!");
  } 
};
 
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes, null, 2) + "\n";
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");

    const dataJSON = dataBuffer.toString();
    console.log(dataJSON);
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
