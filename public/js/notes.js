
const colorArray = ['bg-[#907ad6] text-black', 'bg-[#a0d2db] text-black', 'bg-[#d8a48f] text-black'];

async function notesSidebar() {
    const response = await fetch(`/api/notes`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });

    const returnedCall = await response.json();
    console.log(returnedCall);
    const noteBox = document.getElementById('noteBox');
    noteBox.innerHTML = null
    for (let i = 0; i < returnedCall.length; i++) {
        const singleNote = returnedCall[i];
        const noteId = returnedCall[i].id;
        const individualNote = document.createElement('div');
        const randomColor = Math.floor(Math.random() * colorArray.length);
        individualNote.setAttribute('class', `flex flex-col items-center p-9 w-full border border-solid shadow-2xl h-[20%] ${colorArray[randomColor]} justify-center text-2xl text-tasktastic-secondary font-bold text-center`);
        individualNote.setAttribute('onclick', `showSelectedNote(${noteId})`);
        const title = document.createElement('h2');
        const createdAt = document.createElement('p');
        title.textContent = singleNote.title;
        createdAt.textContent = singleNote.createdAt;

        individualNote.appendChild(title);
        individualNote.appendChild(createdAt);
        noteBox.appendChild(individualNote);
    }
}

async function showSelectedNote(noteId) {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });
    const returnedCall = await response.json();
    showSelectedNoteUi(returnedCall);
}

function clearNote() {
    document.getElementById('showSelectedNote').innerHTML = " ";
}

function createNewNote(showNote) {
    const showCurrentNote = document.getElementById('showSelectedNote');
    console.log('I WORK');
    if (showCurrentNote.innerHTML !== "") {
        clearNote();
    }
}
notesSidebar();

async function updateNote(noteId) {
    console.log(noteId)
    const noteTitle = document.getElementById('noteTitle');
    const noteDescription = document.getElementById('noteDescription');
    const data = {
        title: noteTitle.value,
        description: noteDescription.value,
    };
    console.log(data)
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    notesSidebar()
}


function showSelectedNoteUi(returnedCall) {
    const showNote = document.getElementById('showSelectedNote');
    showNote.setAttribute('class', 'h-full w-full border-2 border-solid');
    if (showNote.innerHTML !== "") {
        clearNote();
    }
    console.log(returnedCall);

    const noteDiv = document.createElement('div');
    noteDiv.setAttribute('class', 'flex flex-col items-center w-full h-full');
    const saveButton = saveButtonUi(returnedCall[0].id);
    const createNewButton = createNewButtonUi();
    const noteTitle = noteTitleUi(returnedCall[0].title);
    const noteDescription = noteDescriptionUi(returnedCall[0].description);
    const noteCreatedAt = noteCreatedAtUi(returnedCall[0].created_at);

    noteDiv.append(noteTitle, noteDescription, noteCreatedAt, createNewButton, saveButton);
    showNote.appendChild(noteDiv);
}

function saveButtonUi(noteId) {
    const saveButton = document.createElement('p');
    saveButton.setAttribute('class', 'absolute mt-[38%] ml-[60%] hover:cursor-pointer');
    saveButton.setAttribute('onclick', `updateNote(${noteId})`);
    saveButton.innerHTML = 'Save'
    return saveButton;
}

function createNewButtonUi() {
    const createNewButton = document.createElement('p');
    createNewButton.setAttribute('class', 'absolute mt-[30px] ml-[60%] hover:cursor-pointer');
    createNewButton.setAttribute('onclick', `createNewNote()`);
    createNewButton.innerHTML = '+ New Note';
    return createNewButton;
}

function noteTitleUi(title) {
    const noteTitle = document.createElement('input');
    noteTitle.setAttribute('class', 'p-2.5 border-2 border-solid w-1/2 m-2.5 flex justify-center text-3xl font-bold bg-tasktastic-input-background');
    noteTitle.setAttribute('id', 'noteTitle')
    noteTitle.value = title;
    return noteTitle
}

function noteDescriptionUi(description) {
    const noteDescription = document.createElement('textarea');
    noteDescription.setAttribute('class', 'p-2.5 border-2 border-tasktastic-gray border-solid w-[98%] m-2.5 h-3/4 bg-tasktastic-input-background');
    noteDescription.setAttribute('id', 'noteDescription')
    noteDescription.value = description;
    return noteDescription
}

function noteCreatedAtUi(createdAt) {
    const noteCreatedAt = document.createElement('p');
    noteCreatedAt.innerHTML = createdAt;
    return noteCreatedAt
}