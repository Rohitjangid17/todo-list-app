let todoUpdate = false;
let todoUpdateId = "";

const onCreateTodo = async (event) => {
    event.preventDefault();
    const todoData = {
        name: document.getElementById("name").value,
        emailId: document.getElementById("emailId").value,
        mobileNumber: document.getElementById("mobileNumber").value
    };

    if (!todoUpdate) {
        try {
            const response = await fetch("https://todo-list-app-7c986-default-rtdb.firebaseio.com/todo.json", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todoData)
            })

            if (response.ok) {
                getTodoList();
            } else {
                throw new Error("Server went wrong");
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        await onTodoUpdate(todoData);
    }
}

const getTodoList = () => {
    fetch("https://todo-list-app-7c986-default-rtdb.firebaseio.com/todo.json")
        .then(res => {
            if (!res.ok) {
                throw new Error('Server Went Wrong');
            }
            return res.json();
        }).then(data => {
            const todoScreen = document.querySelector(".todo-list-screen");
            todoScreen.innerHTML = "";
            let todoList = [];
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    todoList.push({ ...data[key], id: key });
                }
            }
            for (const todo of todoList) {
                const todoRow = document.createElement("div");
                todoScreen.appendChild(todoRow);
                todoRow.classList.add("inventory-grid");
                todoRow.classList.add("border-bottom");

                const id = document.createElement("div");
                id.textContent = 1;
                todoRow.append(id);

                const name = document.createElement("div");
                todoRow.appendChild(name);
                name.textContent = todo.name;

                const emailId = document.createElement("div");
                todoRow.appendChild(emailId);
                emailId.textContent = todo.emailId;

                const mobileNumber = document.createElement("div");
                todoRow.appendChild(mobileNumber);
                mobileNumber.textContent = todo.mobileNumber;

                const todoAction = document.createElement("div");
                todoRow.appendChild(todoAction);
                todoAction.classList.add("todo-action")

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("btn")
                deleteButton.classList.add("btn-danger")
                todoAction.appendChild(deleteButton);
                deleteButton.addEventListener("click", () => {
                    onDeleteTodo(todo.id);
                })

                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.classList.add("btn")
                editButton.classList.add("btn-primary")
                todoAction.appendChild(editButton);

                editButton.addEventListener('click', () => {
                    todoUpdate = true;
                    document.getElementById("name").value = todo.name;
                    document.getElementById("emailId").value = todo.emailId;
                    document.getElementById("mobileNumber").value = todo.mobileNumber;
                    document.getElementById("todoBtn").textContent = "Update Todo";

                    todoUpdateId = todo.id;
                });
            }
        })
}

getTodoList();

const onDeleteTodo = async (id) => {
    try {
        const response = await fetch(`https://todo-list-app-7c986-default-rtdb.firebaseio.com/todo/${id}.json`, {
            method: "DELETE"
        });
        if (response.ok) {
            getTodoList();
        } else {
            throw new Error("Server went wrong");
        }
    } catch (error) {
        console.error(error);
    }
}

const onTodoUpdate = async (todoData) => {
    try {
        const response = await fetch(`https://todo-list-app-7c986-default-rtdb.firebaseio.com/todo/${todoUpdateId}.json`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoData)
        });
        if (response.ok) {
            getTodoList();
        } else {
            throw new Error("Server went wrong");
        }
    } catch (error) {
        console.error(error);
    }
}