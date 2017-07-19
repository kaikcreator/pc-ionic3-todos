import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Platform } from "ionic-angular";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {

  private database:SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(public http: Http, private platform:Platform, private sqlite:SQLite) {
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'todos.db',
        location: 'default'
      })
      .then((db:SQLiteObject)=>{
        this.database = db;

        this.createTables().then(()=>{
          this.dbReady.next(true);
        })
      })
    })

  }

  private createTables(){
    return this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS list (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT
        );`,{})
        .then(()=>{
          return this.database.executeSql(
            `CREATE TABLE IF NOT EXISTS todo (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              description TEXT,
              isImportant INTEGER,
              isDone INTEGER,
              listId INTEGER,
              FOREIGN KEY(listId) REFERENCES list(id)
              );`, {})
        }).catch((err)=>console.log("Error sql ", err));
  }


  private isReady(){
    return new Promise((resolve, reject) =>{
      if(this.dbReady.getValue()){
        resolve();
      }
      else{
        this.dbReady.subscribe((ready)=>{
          if(ready){
            resolve();
          }
        })
      }
    })
  }

  getLists(){
    return this.isReady().then(()=>{
      return this.database.executeSql("SELECT * from list", [])
      .then(data=>{
        let lists = [];
        for(let i =0; i< data.rows.length; i++){
          lists.push(data.rows.item(i));
        }
        return lists;
      })

    })
  }

  getList(id:number){
    return this.isReady().then(()=>{
      return this.database.executeSql(`SELECT * from list WHERE id = ${id}`, [])
      .then(data=>{
        if(data.rows.length){
          return data.rows.item(0);
        }
        return null;
      })

    })
  }  


  addList(name:string){
    return this.isReady().then(()=>{
      return this.database.executeSql(`INSERT INTO list(name) VALUES ('${name}');`, {})
      .then(result=>{
        if(result.insertId){
          return this.getList(result.insertId);
        }
      })
    })
  }

  getTodosFromList(listId:number){}
  addTodo(description:String, isImportant:boolean, isDone:boolean, listId:number){}
  modifyTodo(description:String, isImportant:boolean, isDone:boolean, listId:number){}
}
