import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './models/task.model';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AppState } from './stores/task.reducer';
import { addTask, deleteTask, updateTask } from './stores/task.actions';
import { log } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gestion-task';

  tasks: Task[] = [];

  constructor(private store: Store<AppState>) {

    // this.store.select('tasks').subscribe((tasks) => {
    //   this.tasks = Array.isArray(tasks) ? tasks : Object.values(tasks); // Convert object to array
    //   console.log(this.tasks);
    // });

    this.store.select('tasks').subscribe(
      (tasks) => {
        console.log('tasks array', tasks);
        if (Array.isArray(tasks)) {
          this.tasks = tasks; // If it's already an array, directly assign it
        } else if (tasks && typeof tasks === 'object') {
          this.tasks = Object.values(tasks); // If it's an object, convert to an array
        } else {
          this.tasks = []; // If it's something unexpected, fallback to an empty array
        }
    
        console.log('Processed tasks:', this.tasks);
      },
      (err) => console.error(err),
      () => console.log('Subscription completed')
    );
  }

  addNewTask() {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title: 'New Task',
      description: 'This is a new task.',
    };
    this.store.dispatch(addTask({ task: newTask }));
  }

  updateTask(task: Task) {
    const updatedTask: Task = {
      ...task,
      title: 'Updated Task',
      description: 'This task has been updated.',
    };
    this.store.dispatch(updateTask({ task: updatedTask }));
  }

  deleteTask(id: number) {
    this.store.dispatch(deleteTask({ id }));
  }
}
