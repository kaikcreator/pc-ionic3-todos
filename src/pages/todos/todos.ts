import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { TodoModel } from "../../shared/todo.model";
import { AddTaskModalPage } from "../add-task-modal/add-task-modal";
import { TodoServiceProvider } from "../../providers/todo-service/todo-service";

/**
 * Generated class for the TodosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public todoService: TodoServiceProvider) {
  }

  ionViewDidLoad() {
    
  }

  setTodoStyles(todo:TodoModel){
    let styles = {
      'text-decoration': todo.isDone ? 'line-through' : 'none',
      'font-weight': todo.isImportant ? '600' : 'normal'
    };

    return styles;
  }

  toogleTodo(todo:TodoModel){
    this.todoService.toogleTodo(todo);
  }

  showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss((data)=>{
      if(data){
        this.todoService.addTodo(data);
      }
    });
  }

  removeTodo(todo:TodoModel){
    this.todoService.removeTodo(todo);
  }

  showEditTodo(todo:TodoModel){
    let modal = this.modalCtrl.create(AddTaskModalPage, {todo});
    modal.present();

    modal.onDidDismiss(data=>{
      if(data){
        this.todoService.updateTodo(todo, data);
      }
    });
  }

}
