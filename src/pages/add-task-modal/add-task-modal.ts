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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskModalPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  submit(){
    console.log("model submited: ", this.model);
    this.viewCtrl.dismiss();
  }

}
