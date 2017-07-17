import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { TodoModel } from "../../shared/todo.model";
import { AddTaskModalPage } from "../add-task-modal/add-task-modal";

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

  public todos:any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.todos = [
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
    ]
  }

  setTodoStyles(todo:TodoModel){
    let styles = {
      'text-decoration': todo.isDone ? 'line-through' : 'none',
      'font-weight': todo.isImportant ? '600' : 'normal'
    };

    return styles;
  }

  toogleTodo(todo:TodoModel){
    todo.isDone = ! todo.isDone;
  }

  showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();
  }

}
