import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/taks.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
  ]);

  filter = signal<'all' | 'pending' | 'completed'>('all');

  tasksbyFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  });

  injector = inject(Injector);

  trackTask() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector });
  }


  ngOnInit() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
    this.trackTask();
  }

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,]
  });

  changeHandler() {
    if (this.newTaskCtrl.valid && this.newTaskCtrl.value.trim() !== '') {
      const newTask = this.newTaskCtrl.value;
      this.addTask(newTask);
      this.newTaskCtrl.setValue('');
    }
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  updateStatusTask(index: number) {
    this.tasks.update((tasks) => tasks.map((task, i) => {
      if (i === index) {
        task.completed = !task.completed
      }
      return task;
    }));
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          editing: true
        };
      }
      return {
        ...task,
        editing: false
      };
    }));
  }

  updateTaskTitle(index: number, event: Event) {
    const title = (event.target as HTMLInputElement).value;
    this.tasks.update((tasks) => tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          title: title,
          editing: false
        };
      }
      return task;
    }));
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }

}
