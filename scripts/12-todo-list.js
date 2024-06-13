`
the changes mainly made here is to use foreach in the displayTodo() function instead of for loop
`
let todoList = getTodoFromLocalStorage() || [{}]

// console.log(todoList);

// localStorage.setItem('todo', JSON.stringify([{
//     name: 'make dinner',
//     duedate: '2022-12-22',
// }, {
//     name: 'buy beans',
//     duedate: '2022-12-25',
// }]));

// console.log(JSON.parse(localStorage.getItem('todo')))

 
displayTodo();
function displayTodo(){
    /*displays todolist on the webpage*/
    let todoContainerElem = document.querySelector('.js-todo-container');
    let todolistHTML = ''
    // add all todolist to the todocontainer on the web page
    todoList.forEach((value, index) => {
        const todoObject = value;
        const {name, duedate} = todoObject;
        todolistHTML += `
        <section style="max-width: 90%; ">${name}</section>
        <section>${duedate}</section>
        <button class="js-delete-todo-button">Delete</button>`;
    });
    todoContainerElem.innerHTML = todolistHTML;
    // add eventlistener to the delete button
    document.querySelectorAll('.js-delete-todo-button')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                todoList.splice(index, 1)
                removeTodoFromLocalStorage(index);
                displayTodo();
            });
        });

    // console.log(todolistHTML)
    if (todoContainerElem.innerHTML === '') {
        todoContainerElem.style.display = 'block';
        todoContainerElem.innerHTML = '<p class="no-todo-from-js" style="text-align:center;">Todo List is empty</p>'

    }else{
        todoContainerElem.style.display = 'grid'
    };
};


function resetTodoNameInputElem() {
    const todoNameElem = document.querySelector('.js-todoname');
    todoNameElem.value = '';
};

// |||||||||||||||||||||||||||||||||||||||||||||||||||||
// local storage functions 
// |||||||||||||||||||||||||||||||||||||||||||||||||||||
function saveToLocalStorage(todo){
    todoList.push(todo);
    //  add the updated todolist into localstorage back
    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify(todoList));
};

function getTodoFromLocalStorage(){
    // console.log(localStorage.getItem('todo'));
    const todos = JSON.parse(localStorage.getItem('todo'));
    return todos
};

function removeTodoFromLocalStorage(todoIndex){
    // remove from todolist the todo
    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify(todoList));
    // console.log(todoIndex)
};

// |||||||||||||||||||||||||||||||||||||||||||||||||||||
// local storage functions ends
// |||||||||||||||||||||||||||||||||||||||||||||||||||||

function getTodoAndDate(){
    // get todoname and date elem
    const todoNameElem = document.querySelector('.js-todoname');
    const dateInputElem = document.querySelector('.js-date-input');

    // get the todoname and date value
    const name = todoNameElem.value;
    const duedate = dateInputElem.value;

    return {name, duedate};
};

function handleEnter(event) {
    const {name, duedate} = getTodoAndDate();
    if (event.key==='Enter' && name.length) {
        // console.log(todoList)
        saveToLocalStorage({name, duedate});
        resetTodoNameInputElem()
        displayTodo();
    };
};

function addTodo() {
    /* add todolist to todolist array when the add button is clicked. */
    const {name, duedate} = getTodoAndDate();
    // return if name is ''
    if (!name.length) {
        return;
    }
    // add into array
    saveToLocalStorage({name, duedate});
    displayTodo();
    resetTodoNameInputElem();
    // console.log(todoList)
}



