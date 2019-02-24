const notes = getSavedNotes();

//Create function to Filter data to be called whenever necessary
const filters = {
  searchText: ''
}

renderNotes(notes, filters);

document.querySelector('#create-note').addEventListener('click', function(e){
  const newId = uuidv4();
  notes.push({
    id: newId,
    title: '',
    body: ''
  })
  saveNotes(notes);
  location.assign(`/edit.html#${newId}`);
})

document.querySelector('#search-text').addEventListener('input', function(e){
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
})

document.querySelector('#filter-by').addEventListener('change', function(e) {
  console.log(e.target.value);
})
