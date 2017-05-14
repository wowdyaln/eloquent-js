
changeTodo: function(){
  var changeTodoPositionInput = document.getElementsById('changeTodoPositionInput');
  var changeTodoTextInput = document.getElementsById('changeTodoTextInput');
  todolist.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
  changeTodoPositionInput.value = "";
  changeTodoTextInput.value = "";
}


//Clicking delete should update todoList.todos and the DOM
parseInt();  //把 string 轉換成 number 。 js 內建函數
Number();   //上面跟 constructor Number() 一樣

parseInt("27");
Number("27");

//======//======//======//======//======//======
var todoList = {
  todos: [],

  addTodo: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(index, todoText){
    this.todos[index].todoText = todoText;
  },
  deleteTodo: function(index){
    this.todos.splice(index, 1);
  },
  toggleCompleted: function(index){
    var todo = this.todos[index];
    todo.completed = !todo.completed;
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    //get number of completed todos
    this.todos.forEach(f(todo){
      if (todo.completed === true){
        completedTodos++;
      }
    });

    this.todos.forEach(f(todo){
// case1: if everthing's true, make everthing false
      if (completedTodos === totalTodos){
        todo.completed = false;
// case2: else, make everthing true
      } else {
        todo.completed = true;
      }
    });
  },

};







var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(f(todo, index){
      var todoLi = document.createElemnet('li');
      var todoTextWithCompletion = '';
      if (todo.completed === true;){
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      todoLi.id = index;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);

    }, this);
  },
  createDeleteButton: function(){
    var deleteButton = document.createElemnet('button');
  }


}
