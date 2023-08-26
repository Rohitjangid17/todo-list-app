

const onCreateTodo = (event) => {
    event.preventDefault();
    const todoData = {
        name: document.getElementById("name").value,
        emailId: document.getElementById("emailId").value,
        mobileNumber: document.getElementById("mobileNumber").value
    };
    console.log(todoData);

    fetch("https://todo-list-app-7c986-default-rtdb.firebaseio.com/todo.json", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoData)
    })
        .then(res =>
            res.json()
        )
        .then(res =>
            console.log(JSON.stringify(res))
        )
}