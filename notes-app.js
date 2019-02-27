let notes = getSavedNotes();

//Create function to Filter data to be called whenever necessary
const filters = {
  searchText: '',
  sortBy: 'byEdited'
}

renderNotes(notes, filters);

document.querySelector('#create-note').addEventListener('click', function(e){
  const newId = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id: newId,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp
  })
  saveNotes(notes);
  location.assign(`/edit.html#${newId}`);
})

document.querySelector('#search-text').addEventListener('input', function(e){
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
})

document.querySelector('#filter-by').addEventListener('change', function(e) {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
})

window.addEventListener('storage', function(e){
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
})

// Add createdAt and updatedAt to the new notes (store timestamp)
// Update the updatedAt when someone edits a title or body
// Delete all old notes before testing