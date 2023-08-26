const onCreateTodo = (event) => {
    event.preventDefault();
    const todoData = {
        name: document.getElementById("name").value,
        emailId: document.getElementById("emailId").value,
        mobileNumber: document.getElementById("mobileNumber").value
    };

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
            JSON.stringify(res)
        );
    getTodoList();
}

const getTodoList = () => {
    fetch("https://todo-list-app-7c986-default-rtdb.firebaseio.com/todo.json")
        .then(res => {
            if (!res.ok) {
                throw new Error('Server response was not ok!!');
            }
            return res.json();
        }).then(data => {
            let todoList = [];
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    todoList.push({ ...data[key], id: key });
                }
            }
            for (const todo of todoList) {
                console.log(todo.id)
            }
        })
}
getTodoList();