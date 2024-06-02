
const colorArray = ['bg-[#907ad6] text-black', 'bg-[#a0d2db] text-black', 'bg-[#d8a48f] text-black']

async function notesSidebar() {
    const callApi = await fetch(`http://127.0.0.1:6002/api/notes/1`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })

    const returnedCall = await callApi.json()
    console.log(returnedCall[0])
    for (let i = 0; i < 10; i++) {
        const singleNote = returnedCall[0]
        const noteBox = document.getElementById('noteBox')
        const individualNote = document.createElement('div')
        const randomColor = Math.floor(Math.random() * colorArray.length)
        individualNote.setAttribute('class', `flex flex-col items-center p-9 w-full border border-solid shadow-2xl ${colorArray[randomColor]}`)
        const title = document.createElement('h2')
        const description = document.createElement('p')
        const createdAt = document.createElement('p')
        title.textContent = singleNote.title
        description.textContent = singleNote.description
        createdAt.textContent = singleNote.createdAt

        individualNote.appendChild(title)
        individualNote.appendChild(description)
        individualNote.appendChild(createdAt)
        noteBox.appendChild(individualNote)
    }
}

async function showSelectedNote() {
    const callApi = await fetch(`http://127.0.0.1:6002/api/notes/1`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
}

notesSidebar()