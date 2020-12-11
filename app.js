//selectors
const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption= document.querySelector(".filter-todo");


//event listeners

//if page is loaded, call the function
document.addEventListener('DOMContentLoaded',getTodos);

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);





//functions

function addTodo(event) {

    if (todoInput.value == "") {
        alert("You have not entered anything to do!");
    }
    else {
        //prevents from reloading the page, because the submit button is clicked
        event.preventDefault();
        //todo div creation
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //li creation
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todoInput.value;
        //appends newTodo item to the main div
        todoDiv.appendChild(newTodo);
        //add todo to localstorage
        saveToLocalStorage(todoInput.value);
        //check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check" ></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //delete button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
        //clear input value
        todoInput.value = null;
    }
}

function deleteCheck(event)
{
    const item= event.target;
    const todo=item.parentElement;
    //DELETE TODO
    if(item.classList[0]==='trash-btn')
    {
        //animation
        todo.classList.add('fall');
        removeFromLocalStorage(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }

    //checkmark
    if(item.classList[0]==='complete-btn')
    {
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":

                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveToLocalStorage(todo)
{
    //check if there are items in already
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
     //todo div creation
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('todo');
     //li creation
     const newTodo = document.createElement('li');
     newTodo.classList.add('todo-item');
     newTodo.innerText = todo;
     //appends newTodo item to the main div
     todoDiv.appendChild(newTodo);
     //check button
     const completedButton = document.createElement('button');
     completedButton.innerHTML = '<i class="fas fa-check" ></i>';
     completedButton.classList.add("complete-btn");
     todoDiv.appendChild(completedButton);
     //delete button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);
      //append to list
      todoList.appendChild(todoDiv);
    });
}

function removeFromLocalStorage(todo)
{
    //check if there are items in already
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}