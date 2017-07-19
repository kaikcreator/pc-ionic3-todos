import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { TodoModel } from "../../shared/todo.model";

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {

  public todos:TodoModel[] = [];

  constructor(public http: Http, public storage:Storage) {
  }

  loadFromList(id:number){
    this.getFromLocal(id);
  }

  saveLocally(id:number){
    this.storage.ready().then(()=>{
      this.storage.set(`list/${id}`, this.todos);
    });
  }

  private getFromLocal(id:number){
    return this.storage.ready().then(()=>{
      return this.storage.get(`list/${id}`).then(data=>{
        if(!data){
          this.todos = [];
          return;
        }

        let localTodos: TodoModel[] = [];
        for(let todo of data){
          localTodos.push(new TodoModel(todo.description, todo.isImportant, todo.isDone));
        }
        this.todos = localTodos;
      })
    })
  }


  toogleTodo(todo:TodoModel){
    let updatedTodo = TodoModel.clone(todo);
    updatedTodo.isDone = !todo.isDone;
    this.updateTodo(todo, updatedTodo);
  }

  addTodo(todo:TodoModel){
    this.todos = [...this.todos, todo];
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
