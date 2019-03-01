const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const editedElement = document.querySelector('#last-edited');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (note === undefined) {
  location.assign('/index.html');
}

titleElement.value = note.title;
bodyElement.value = note.body;
editedElement.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener('input', (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  editedElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
})

bodyElement.addEventListener('input', (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  editedElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
})

document.querySelector('#remove-note').addEventListener('click', (e) => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign('/index.html');
})

window.addEventListener('storage', (e) => {
  console.log('changed');
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    note = notes.find((note) => note.id === noteId);
    
    if (note === undefined) {
      location.assign('/index.html');
    }
    
    titleElement.value = note.title;
    bodyElement.value = note.body;
    editedElement.textContent = generateLastEdited(note.updatedAt);
  }
})