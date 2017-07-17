import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from "../../shared/todo.model";


@Pipe({
  name: 'prioritizedTodos',
  pure: false
})
export class PrioritizedTodosPipe implements PipeTransform {

  transform(todos:TodoModel[], ...args) {
    return todos.filter(todo => !todo.isDone).sort((a,b)=>{
      return (b.isImportant && !a.isImportant ? 1 : -1);
    });
  }
}
