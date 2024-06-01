async function getNotes() {
    const callApi = await fetch(`http://127.0.0.1:6002/todos/1`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })

    const returnedCall = await callApi.json()
    console.log(returnedCall)
}