'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

let locolStorage = function(){
    if(JSON.parse(localStorage.getItem('todoData'))) {
        todoData = JSON.parse(localStorage.getItem('todoData'));
    } else {
      return;
    }
  };
  
  locolStorage();
const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML= '<span class="text-todo">' + item.value +'</span>' +
         '<div class="todo-buttons">' +
         '<button class="todo-remove"></button>' +
         '<button class="todo-complete"></button>' +
         '</div>';

         if(item.comleted) {
             todoCompleted.append(li);
         } else {
             todoList.append(li);
         }

         const btnTodoCompleted = li.querySelector('.todo-complete');

         btnTodoCompleted.addEventListener('click', function() {
             item.comleted = !item.comleted;
             render();
         })

         const btnTodoRemove = li.querySelector('.todo-remove');
            
         btnTodoRemove.addEventListener('click', function(){   
            todoData.splice(todoData.indexOf(item), 1); 
            render();
            
            });
    });
    localStorage.setItem('todoData', JSON.stringify(todoData));
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();


    if(headerInput.value === '') {
        todoControl.setAttribute('disable', true);
        return;
    } else {
        todoControl.setAttribute('disable', false);
    }

    const newTodo = {
        value: headerInput.value,
        comleted: false
    }

    todoData.push(newTodo);
    
    render();
    document.getElementById("header-input").value = '';
});

render();