
const colorArray = ['bg-[#907ad6] text-black', 'bg-[#a0d2db] text-black', 'bg-[#d8a48f] text-black']

async function notesSidebar() {
    const response = await fetch(`/api/notes`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })

    const returnedCall = await response.json()
    console.log(returnedCall)
    for (let i = 0; i < returnedCall.length; i++) {
        const singleNote = returnedCall[i]
        const noteId = returnedCall[i].id
        const noteBox = document.getElementById('noteBox')
        const individualNote = document.createElement('div')
        const randomColor = Math.floor(Math.random() * colorArray.length)
        individualNote.setAttribute('class', `flex flex-col items-center p-9 w-full border border-solid shadow-2xl h-[20%] ${colorArray[randomColor]}`)
        individualNote.setAttribute('onclick', `showSelectedNote(${noteId})`)
        const title = document.createElement('h2')
        const createdAt = document.createElement('p')
        title.textContent = singleNote.title
        createdAt.textContent = singleNote.createdAt

        individualNote.appendChild(title)
        individualNote.appendChild(createdAt)
        noteBox.appendChild(individualNote)
    }
}

async function showSelectedNote(noteId) {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    const showNote = document.getElementById('showSelectedNote')
    showNote.setAttribute('class', 'h-full w-full border-2 border-solid')
    if (showNote.innerHTML !== "") {
        clearNote()
    }
    const returnedCall = await response.json()
    console.log(returnedCall)
    const noteDiv = document.createElement('div')
    const createNew = document.createElement('p')
    createNew.setAttribute('class', 'absolute mt-[30px] ml-[1200px] hover:cursor-pointer')
    createNew.setAttribute('onclick', `createNewNote()`)
    createNew.innerHTML = '+ New Note'
    noteDiv.setAttribute('class', 'flex flex-col items-center w-full h-full')
    const noteTitle = document.createElement('h2')
    noteTitle.setAttribute('class', 'p-2.5 border-2 border-solid w-1/2 m-2.5 flex justify-center text-3xl font-bold')
    noteTitle.innerHTML = returnedCall[0].title
    const noteDescription = document.createElement('p')
    noteDescription.setAttribute('class', 'p-2.5 border-2 border-solid w-[98%] m-2.5 h-3/4')
    noteDescription.innerHTML = returnedCall[0].description
    const noteCreatedAt = document.createElement('p')
    noteCreatedAt.innerHTML = returnedCall[0].created_at
    noteDiv.appendChild(noteTitle)
    noteDiv.appendChild(noteDescription)
    noteDiv.appendChild(noteCreatedAt)
    noteDiv.appendChild(createNew)
    showNote.appendChild(noteDiv)

}

function clearNote() {
    document.getElementById('showSelectedNote').innerHTML = " "
}

function createNewNote() {
    console.log('I WORK')
}
notesSidebar()