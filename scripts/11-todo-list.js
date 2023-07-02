
const todoList = [
  {
    name: 'make dinner',
    dueDate: '2022-12-22'
  }, 
  {
    name: 'wash dishes',
    dueDate: '2022-12-22'
  }];

renderTodoList();

function renderTodoList() {
  todoListHTML = ''
  for (let i=0; i<todoList.length; i++) {
    const {name, dueDate} = todoList[i];
    todoListHTML += `
    <div> ${name} </div>
    <div> ${dueDate} </div>
    <button onclick="
      todoList.splice(${i}, 1);
      renderTodoList();
    " class="delete-todo-button">Delete</button>`;
  }
  document.querySelector('.js-todo-items').innerHTML = todoListHTML;
}


function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    name,
    dueDate
  });

  todoList.push(name);
  console.log(todoList);

  inputElement.value = '';

  renderTodoList();
}

