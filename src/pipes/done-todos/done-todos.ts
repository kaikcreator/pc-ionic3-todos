import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from "../../shared/todo.model";


@Pipe({
  name: 'doneTodos',
  pure:false
})
export class DoneTodosPipe implements PipeTransform {
 
  transform(todos:TodoModel[], ...args) {
    return todos.filter(todo => todo.isDone);
  }
}
