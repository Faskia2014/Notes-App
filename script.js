function popUp() {
    const popupContainer = document.createElement("div");
    popupContainer.id = "popupContainer";
    popupContainer.innerHTML = `
        <h1>New Note</h1>
        <textarea id="note-text" placeholder="Enter your text here...."></textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="createNote()">Create Note</button>
            <button id="closeBtn" onclick="closePopup()">Close</button>
        </div>
    `;
    document.body.appendChild(popupContainer);
}

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
        popupContainer.remove();
    }
}

function createNote() {
    const noteText = document.getElementById("note-text").value;
    if (noteText.trim() !== '') {
        const note = {
            id: new Date().getTime(),
            text: noteText
        };

        const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
        existingNotes.push(note);

        localStorage.setItem("notes", JSON.stringify(existingNotes));
        document.getElementById("note-text").value = '';

        closePopup();
        displayNotes();
    }
}

function displayNotes() {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${note.text}</span>
            <div id="noteBtns-container">
                <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
                <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        notesList.appendChild(listItem);
    });
}

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteToEdit = notes.find(note => note.id === noteId);
    const noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement("div");
    editingPopup.id = "editing-container";
    editingPopup.setAttribute("data-note-id", noteId);
    editingPopup.innerHTML = `
        <h1>Editing Note</h1>
        <textarea id="note-text">${noteText}</textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="updateNote()">Done</button>
            <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
        </div>
    `;
    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container");
    if (editingPopup) {
        editingPopup.remove();
    }
}

function updateNote() {
    const noteText = document.getElementById("note-text").value.trim();
    const editingPopup = document.getElementById("editing-container");

    if (noteText !== '') {
        const noteId = editingPopup.getAttribute("data-note-id");
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        const updatedNotes = notes.map(note => {
            if (note.id == noteId) {
                return { id: note.id, text: noteText };
            }
            return note;
        });

        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        closeEditPopup();
        displayNotes();
    }
}

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

document.addEventListener("DOMContentLoaded", displayNotes);
