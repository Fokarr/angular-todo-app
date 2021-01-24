import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from "../../services/todo.service";

import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter;

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      "is-completed": this.todo.completed
    }
    return classes;
  }

  onToggle(todo) {
    // Toggle in Ui
    todo.completed = !todo.completed;
    // Toggle on server 
    this.todoService.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
