import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from "../../shared/todo.model";

/**
 * Generated class for the PrioritizedTodosPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'prioritizedTodos'
})
export class PrioritizedTodosPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(todos: TodoModel[], ...args) {
    console.log("prioritized todos pipe");
    return todos.filter(todo => !todo.isDone).sort((a,b)=>{
      return (b.isImportant && !a.isImportant) ? 1 : -1;
    });
  }
}
