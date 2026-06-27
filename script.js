// HTMLの要素を取得
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// localStorageから保存済みのToDoを取得
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// ページを開いたときにToDoを表示
renderTodos();

// 追加ボタンをクリックしたらToDoを追加
addButton.addEventListener("click", addTodo);

// Enterキーを押してもToDoを追加
todoInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

// ToDoを追加する関数
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("ToDoを入力してください");
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false
  };

  todos.push(newTodo);

  todoInput.value = "";

  saveTodos();
  renderTodos();
}

// ToDoを画面に表示する関数
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(function(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";

    const leftDiv = document.createElement("div");
    leftDiv.className = "todo-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", function() {
      toggleTodo(todo.id);
    });

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = "todo-text";

    if (todo.completed) {
      span.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function() {
      deleteTodo(todo.id);
    });

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    li.appendChild(leftDiv);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
  });
}

// 完了チェックを切り替える関数
function toggleTodo(id) {
  todos = todos.map(function(todo) {
    if (todo.id === id) {
      return {
        id: todo.id,
        text: todo.text,
        completed: !todo.completed
      };
    }

    return todo;
  });

  saveTodos();
  renderTodos();
}

// ToDoを削除する関数
function deleteTodo(id) {
  todos = todos.filter(function(todo) {
    return todo.id !== id;
  });

  saveTodos();
  renderTodos();
}

// localStorageに保存する関数
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}