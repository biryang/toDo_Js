const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pending"),
  finishedList = document.querySelector(".js-finished");

const TODO_PEND = "Pending";
const TODO_FINISH = "Finished";
const TODO_NEW = "New";

let todosPend = [];
let todosFinish = [];

function savetodo() {
  localStorage.setItem(TODO_PEND, JSON.stringify(todosPend));
  localStorage.setItem(TODO_FINISH, JSON.stringify(todosFinish));
}

function removetodo(e) {
  const btn = e.target;
  const div = btn.parentNode;
  const li = div.parentNode
  const ul = li.parentNode.className;


  if (ul === "js-pending") {
    pendingList.removeChild(li);

    const removetodos = todosPend.filter(function (todo) {
      return todo.id !== parseInt(li.id);
    });
    todosPend = removetodos;
  } else {
    finishedList.removeChild(li);

    const removetodos = todosFinish.filter(function (todo) {
      return todo.id !== parseInt(li.id);
    });
    todosFinish = removetodos;
  }
  savetodo();
}

function checkTodo(e) {
  const btn = e.target;
  const div = btn.parentNode;
  const li = div.parentNode
  const ul = li.parentNode.className;

  if (ul === "js-pending") {
    btn.innerText = "⏪";
    finishedList.insertBefore(li, finishedList.firstChild);
    const pendtodos = todosPend.filter(function (todo) {
      return todo.id !== parseInt(li.id);
    });
    const finishtodos = todosPend.filter(function (todo) {
      return !pendtodos.includes(todo);
    });

    todosPend = pendtodos;
    todosFinish.push(finishtodos[0]);
  } else {
    btn.innerText = "✅";
    pendingList.insertBefore(li, pendingList.firstChild);
    const finishtodos = todosFinish.filter(function (todo) {
      return todo.id !== parseInt(li.id);
    });
    const pendtodos = todosFinish.filter(function (todo) {
      return !finishtodos.includes(todo);
    });

    todosFinish = finishtodos;
    todosPend.push(pendtodos[0]);
  }
  savetodo();
}

function paintTodo(id, text, statsu) {
  // id = todo.id
  const li = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");
  span.innerText = text;
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", removetodo);

  const checkBtn = document.createElement("button");
  if (statsu !== TODO_FINISH) {
    checkBtn.innerText = "✅";
  } else {
    checkBtn.innerText = "⏪";
  }
  checkBtn.addEventListener("click", checkTodo);

  let todoId;
  if (id == TODO_NEW) {
    todoId = new Date().getTime();
  } else {
    todoId = id;
  }

  li.appendChild(span);
  li.appendChild(div)
  div.appendChild(delBtn);
  div.appendChild(checkBtn);
  li.id = todoId;

  div.classList.add("todo");

  const todoObj = {
    id: todoId,
    text: text
  };

  if (statsu !== TODO_FINISH) {
    pendingList.appendChild(li);
    todosPend.push(todoObj);
  } else {
    finishedList.append(li);
    todosFinish.push(todoObj);
  }

  savetodo();
}

function loadtodo() {
  const pendtodo = localStorage.getItem(TODO_PEND);
  const finishtodo = localStorage.getItem(TODO_FINISH);

  if (pendtodo !== null) {
    const parsedtodo = JSON.parse(pendtodo);
    parsedtodo.forEach(function (todo) {
      paintTodo(todo.id, todo.text, TODO_PEND);
    });
  }
  if (finishtodo !== null) {
    const parsedtodo = JSON.parse(finishtodo);
    parsedtodo.forEach(function (todo) {
      paintTodo(todo.id, todo.text, TODO_FINISH);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintTodo(TODO_NEW, currentValue);
  todoInput.value = "";
}

function toDoInit() {
  loadtodo();
  todoForm.addEventListener("submit", handleSubmit);
}

toDoInit();
