
const colorArray = ['bg-[#907ad6] text-black', 'bg-[#a0d2db] text-black', 'bg-[#d8a48f] text-black'];

async function notesSidebar(viewMode = 'grid') {
    const response = await fetch(`/api/notes`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });

    const returnedCall = await response.json();
    console.log(returnedCall);
    const sidebar = document.getElementById('sidebar')
    const noteBox = document.getElementById('noteBox')
    noteBox.innerHTML = null
    const listButton = listViewButtonUi(viewMode)
    sidebar.innerHTML = null
    sidebar.append(listButton, noteBox)
    let classes = ' h-40'
    let noteBoxClasses = 'grid grid-cols-2 w-[500px] gap-3 ml-7 px-7 pt-7 rounded-lg overflow-auto flex-wrap content-baseline bg-tasktastic-box overflow-auto h-[90%]'
    if (viewMode === 'list') {
        classes = 'w-full h-10 flex flex-col items-center justify-center'
        noteBoxClasses = 'flex flex-col w-[500px] gap-3 ml-7 px-7 pt-7 rounded-lg overflow-auto flex-wrap content-baseline bg-tasktastic-box overflow-auto h-[90%]'

    }
    noteBox.setAttribute('class', noteBoxClasses)
    for (let i = 0; i < returnedCall.length; i++) {
        const singleNote = returnedCall[i];
        const noteId = returnedCall[i].id;
        const individualNote = document.createElement('div');
        const randomColor = Math.floor(Math.random() * colorArray.length);
        individualNote.setAttribute('class', `min-h-8 rounded-lg ${classes} shadow-2xl ${colorArray[randomColor]} text-2xl text-tasktastic-secondary font-bold text-center`);
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
notesSidebar();

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


async function createNewNote() {
    const noteDescription = document.getElementById('noteDescription');
    const noteTitle = document.getElementById('noteTitle');
    const data = {
        title: noteTitle.value,
        description: noteDescription.value
    };
    const response = await fetch(`/api/notes`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    });
    notesSidebar()
}

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

async function deleteNote(noteId) {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });
    notesSidebar()

}


function clearNote() {
    document.getElementById('showSelectedNote').innerHTML = " ";
}

function showSelectedNoteUi(returnedCall) {
    const showNote = document.getElementById('showSelectedNote');
    showNote.setAttribute('class', 'h-[90%] w-[95%] bg-tasktastic-box rounded-lg shadow-2xl');
    if (showNote.innerHTML !== "") {
        clearNote();
    }
    console.log(returnedCall);

    const noteDiv = document.createElement('div');
    const buttonDiv = document.createElement('div')
    const containerBottom = document.createElement('div')
    containerBottom.setAttribute('class', 'w-full flex items-center justify-evenly')
    buttonDiv.setAttribute('class', 'flex w-3/4 justify-end gap-1.5')
    noteDiv.setAttribute('class', 'flex flex-col items-center w-full h-full');
    const saveButton = saveButtonUi(returnedCall[0].id);
    const createNewButton = createNewButtonUi();
    const noteTitle = noteTitleUi(returnedCall[0].title);
    const noteDescription = noteDescriptionUi(returnedCall[0].description);
    const noteCreatedAt = noteCreatedAtUi(returnedCall[0].created_at);
    const deleteButton = deleteButtonUi(returnedCall[0].id)

    buttonDiv.append(createNewButton, saveButton, deleteButton)
    noteDiv.append(noteTitle, noteDescription, noteCreatedAt);
    containerBottom.append(noteCreatedAt, buttonDiv)
    noteDiv.append(containerBottom)
    showNote.appendChild(noteDiv);
}

function listViewButtonUi(viewMode) {
    const listButton = document.createElement('button')
    listButton.setAttribute('class', 'absolute px-5 py-2 bg-[#8b5cf6] text-white hover:cursor-pointer rounded-lg font-bold')
    if (viewMode === 'list') {
        listButton.innerHTML = "Grid View"
        listButton.setAttribute('onclick', `notesSidebar('grid')`)
    } else {
        listButton.innerHTML = "List View"
        listButton.setAttribute('onclick', `notesSidebar('list')`);
    }
    console.log(viewMode)
    return listButton
}

function saveButtonUi(noteId) {
    const saveButton = document.createElement('button');
    saveButton.setAttribute('class', ' px-5 py-2 bg-[#8b5cf6] text-white hover:cursor-pointer rounded-lg font-bold');
    saveButton.setAttribute('onclick', `updateNote(${noteId})`);
    saveButton.innerHTML = 'Save'
    return saveButton;
}

function createNewButtonUi() {
    const createNewButton = document.createElement('button');
    createNewButton.setAttribute('class', ' px-5 py-2 bg-[#22c55e] text-white hover:cursor-pointer rounded-lg font-bold');
    createNewButton.setAttribute('onclick', `createNewNoteUi()`);
    createNewButton.innerHTML = '+ New Note';
    return createNewButton;
}

function deleteButtonUi(noteId) {
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', ' px-5 py-2 bg-[#ef4444] text-white hover:cursor-pointer rounded-lg font-bold');
    deleteButton.setAttribute('onclick', `deleteNote(${noteId})`);
    deleteButton.innerHTML = 'Delete';
    return deleteButton;
}

function noteTitleUi(title) {
    const noteTitle = document.createElement('input');
    noteTitle.setAttribute('class', 'p-2.5 rounded-lg w-1/2 m-2.5 flex justify-center text-3xl font-bold bg-tasktastic-input-background');
    noteTitle.setAttribute('id', 'noteTitle')
    noteTitle.placeholder = "Title"
    if (title === undefined) {
        noteTitle.value = ""
    } else {
        noteTitle.value = title;
    }
    return noteTitle
}

function noteDescriptionUi(description) {
    const noteDescription = document.createElement('textarea');
    noteDescription.setAttribute('class', 'p-2.5 rounded-lg w-[95%] m-2.5 h-4/5 bg-tasktastic-input-background');
    noteDescription.setAttribute('id', 'noteDescription')
    noteDescription.placeholder = "Type note here"
    if (description === undefined) {
        noteDescription.value = ""
    } else {
        noteDescription.value = description;
    }
    return noteDescription
}

function noteCreatedAtUi(createdAt) {
    const noteCreatedAt = document.createElement('p');
    noteCreatedAt.innerHTML = createdAt;
    return noteCreatedAt
}

function createNewNoteUi(showNote) {
    const noteDiv = document.createElement('div');
    const buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'flex w-full justify-end gap-1.5 pr-8')
    noteDiv.setAttribute('class', 'flex flex-col items-center w-full h-full');
    const showCurrentNote = document.getElementById('showSelectedNote');
    showCurrentNote.setAttribute('class', 'h-[90%] w-[95%] bg-tasktastic-box rounded-lg shadow-2xl');
    const saveButton = saveButtonUi();
    const createNewButton = createNewButtonUi();
    const noteTitle = noteTitleUi();
    const noteDescription = noteDescriptionUi(); //add input value
    const saveNewNoteButton = document.createElement('button');
    saveNewNoteButton.setAttribute('class', 'px-5 py-2 bg-[#ef4444] text-white hover:cursor-pointer rounded-lg font-bold');
    saveNewNoteButton.setAttribute('onclick', `createNewNote()`)
    saveNewNoteButton.innerHTML = "Create New Note"
    console.log('I WORK');
    if (showCurrentNote.innerHTML !== "") {
        clearNote();
    }
    buttonDiv.append(createNewButton, saveButton, saveNewNoteButton)
    noteDiv.append(noteTitle, noteDescription);
    noteDiv.appendChild(buttonDiv)
    showCurrentNote.appendChild(noteDiv);
}

