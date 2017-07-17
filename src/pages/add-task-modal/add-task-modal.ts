import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TodoModel } from "../../shared/todo.model";

/**
 * Generated class for the AddTaskModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-task-modal',
  templateUrl: 'add-task-modal.html',
})
export class AddTaskModalPage {

  public model:TodoModel = new TodoModel('');
  public title:string = "Add new task";
  public buttonText:string = "ADD";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController){
      if(this.navParams.get('todo')){
        this.model = TodoModel.clone(this.navParams.get('todo'));
        this.title = "Edit task";
        this.buttonText = "SAVE CHANGES";
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskModalPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  submit(){
    this.viewCtrl.dismiss(this.model);
  }

}
