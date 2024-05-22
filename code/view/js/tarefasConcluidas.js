document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.querySelector("#todo-list");

    const getTodosLocalStorage = () => {
        return JSON.parse(localStorage.getItem("todos")) || [];
    };

    const loadCompletedTodos = () => {
        const todos = getTodosLocalStorage();

        todos.forEach((todo) => {
            if (todo.done) {
                displayTodo(todo);
            }
        });
    };

    const displayTodo = (todo) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo");

        const todoTitle = document.createElement("h3");
        todoTitle.innerText = todo.title;
        todoItem.appendChild(todoTitle);

        const todoText = document.createElement("p");
        todoText.innerText = todo.text;
        todoItem.appendChild(todoText);

        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-todo");
        doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        todoItem.appendChild(doneBtn);

        todoItem.classList.add("done");

        todoList.appendChild(todoItem);
    };

    loadCompletedTodos();
});
