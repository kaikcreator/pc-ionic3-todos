import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { TodoModel } from "../../shared/todo.model";
import { AddTaskModalPage } from "../add-task-modal/add-task-modal";
import { TodoServiceProvider } from "../../providers/todo-service/todo-service";
import { ListModel } from "../../shared/list.model";

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
  
  private toogleTodoTimeout:any = null;
  public list:ListModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public todoService: TodoServiceProvider,
    private platform: Platform) {
      this.list = this.navParams.get('list');
      this.todoService.loadFromList(this.list.id);
  }

  ionViewDidLoad() {  }

  ionViewWillUnload(){
    this.todoService.saveLocally(this.list.id);
  }

  setTodoStyles(todo:TodoModel){
    let styles = {
      'text-decoration': todo.isDone ? 'line-through' : 'none',
      'font-weight': todo.isImportant ? '600' : 'normal'
    };

    return styles;
  }

  toogleTodo(todo:TodoModel){
    if(this.toogleTodoTimeout)
      return;

    this.toogleTodoTimeout = setTimeout(()=>{
      this.todoService.toogleTodo(todo);
      this.toogleTodoTimeout = null;
    }, !this.platform.is("ios") ? 300 : 0);
    
  }

  addTodo(todo:TodoModel){
    this.todoService.addTodo(todo);
  }

  removeTodo(todo:TodoModel){
    this.todoService.removeTodo(todo);
  }

  showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss(data=>{
      if(data){
        this.addTodo(data);
      }
    })
  }

  showEditTodo(todo:TodoModel){
    let modal = this.modalCtrl.create(AddTaskModalPage, {todo});
    modal.present();
    modal.onDidDismiss(data=>{
      if(data){
        this.todoService.updateTodo(todo, data);
      }
    })


  }

}
