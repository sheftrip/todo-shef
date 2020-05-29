//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const rateList = document.querySelector(".rate-list");
const filterOption = document.querySelector(".filter-todos");
let ratePressed = 0;


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoList.addEventListener('click', rated);
filterOption.addEventListener('click', filterTodo);


//Functions

function addTodo(event){
    ratePressed = 0;
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveLocal(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton)

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash-alt"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton)

    const productivity = document.createElement('button');
    productivity.innerHTML = '<i class="fas fa-comment"></i>'
    productivity.classList.add('prod-btn');
    todoDiv.appendChild(productivity)

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target;

    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        // if(todo.nextSibling){
        //     console.log(todo.nextSibling.innerHTML);
        //     todo.nextSibling.remove();
        // }
        removeLocal(todo);
        todo.remove();
        
    }

    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

    if(item.classList[0] === 'prod-btn' && ratePressed === 0){

        ratePressed = 1;
        const todo = item.parentElement;
        // console.log(todo.innerHTML);

        const todoDiv = document.createElement('div');
        todoDiv.classList.add("rate-list");

        const rateButton1 = document.createElement('button');
        rateButton1.innerHTML = '<i class = "fas fa-frown"></i>'
        rateButton1.classList.add('rate-btn');
        todoDiv.appendChild(rateButton1);
        const rateButton2 = document.createElement('button');
        rateButton2.innerHTML = '<i class = "fas fa-meh"></i>'
        rateButton2.classList.add('rate-btn');
        todoDiv.appendChild(rateButton2);
        const rateButton3 = document.createElement('button');
        rateButton3.innerHTML = '<i class = "fas fa-smile"></i>'
        rateButton3.classList.add('rate-btn');
        todoDiv.appendChild(rateButton3);
        todo.appendChild(todoDiv);

        // console.log(todoDiv.innerHTML);

    }
}

function rated(event){
    const item = event.target;

    if(item.classList[0] === 'rate-btn'){
        item.classList.toggle("rated");
    }
}

function filterTodo(event){
    // console.log("HERE");
    const todos = todoList.childNodes;
    // console.log(todos);
    todos.forEach(function(todoItem){
        // console.log(todoItem);
        switch(event.target.value){
            case "all":
                todoItem.style.display = "flex";
                break;
            case "completed":
                // console.log("HHH");
                if(todoItem.classList.contains("completed")){
                    todoItem.style.display = "flex";
                }
                else{
                    todoItem.style.display = "none";
                }
                break;
            case "incomplete":
                if(todoItem.classList.contains("completed")){
                    todoItem.style.display = "none";
                }
                else{
                    todoItem.style.display = "flex";
                }
                break;
        }
    });
}

function saveLocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton)

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash-alt"></i>'
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton)

        const productivity = document.createElement('button');
        productivity.innerHTML = '<i class="fas fa-comment"></i>'
        productivity.classList.add('prod-btn');
        todoDiv.appendChild(productivity)

        todoList.appendChild(todoDiv);
    });

}

function removeLocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoInd = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoInd,1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
