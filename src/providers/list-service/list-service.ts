import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { ListModel } from "../../shared/list.model";
import { DatabaseServiceProvider } from "../database-service/database-service";

/*
  Generated class for the ListServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ListServiceProvider {

  public lists: ListModel[];

  constructor(public http: Http, public database:DatabaseServiceProvider) {
    this.getLists();
  }



  getLists(){
    return this.database.getLists()
    .then(data=>{
        let localList:ListModel[] = [];
        if(data){
          for(let list of data){
            localList.push(new ListModel(list.name, list.id));
          }
          this.lists = localList;
        }      
    })
  }


  addList(name:string){
    return this.database.addList(name).then((list)=>{
      return this.getLists().then(()=>{
        return list;
      })
    });
  }
}

