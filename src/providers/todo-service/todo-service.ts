import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TodoModel } from "../../shared/todo.model";

@Injectable()
export class TodoServiceProvider {

  public todos: TodoModel[];

  constructor(public http: Http) {
    this.getTodos();
  }

  getTodos(){
    this.todos = this.todos = [
      new TodoModel("1 description"),
      new TodoModel("2 description"),
      new TodoModel("3 description"),
      new TodoModel("4 description"),
      new TodoModel("5 description"),
      new TodoModel("6 description", true),
      new TodoModel("7 description"),
      new TodoModel("8 description", true),
      new TodoModel("9 description"),
      new TodoModel("10 description"),
      new TodoModel("11 description", false, true),
      new TodoModel("12 description"),
      new TodoModel("13 description", true, true),
      new TodoModel("14 description"),
      new TodoModel("15 description"),
      new TodoModel("16 description")
    ];
  }

  toogleTodo(todo:TodoModel){
    todo.isDone = ! todo.isDone;
  }

  addTodo(todo:TodoModel){
    this.todos.push(todo);
  }

  removeTodo(todo:TodoModel){
    const index = this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0, index),
      ...this.todos.slice(index+1)
    ];
  }

  updateTodo(originalTodo:TodoModel, modifiedTodo:TodoModel){
    const index = this.todos.indexOf(originalTodo);
    this.todos = [
      ...this.todos.slice(0,index),
      modifiedTodo,
      ...this.todos.slice(index+1)
    ];
  }

}
