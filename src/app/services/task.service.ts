import { Injectable } from '@angular/core';
import Task from '../interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  createTask(task:Task | any) {
    let tasks:any = this.getAllTasks();

    if(tasks.length > 0) {
      const ids = tasks.map((obj:any) => obj.id);
      const lastId = Math.max(...ids);

      task.id = lastId+1;

      tasks.push(task);

    } else {
      task.id = 1;
      tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

  }

  getAllTasks():[] {
    let tasks = localStorage.getItem('tasks');
    if(tasks) {
      return JSON.parse(tasks);
    } else {
      return [];
    }
  }

  getTaskById(id: number) {
    const tasks = this.getAllTasks();
    let task = tasks.filter((t:any) => t.id == id);
    return task;
  }

  updateTask(task:Task | any) {
    let currentTasks = this.getAllTasks();
    currentTasks.map( (t:any) => {
      if(t.id == task.id) {
        t.title = task.title;
        t.description = task.description;
        t.status = task.status;
        t.completeDate = task.completeDate;
        t.startDate = task.startDate;
      }
    });

    localStorage.setItem('tasks', JSON.stringify(currentTasks));
  }

  deleteTask(id: number) {
    let tasks = this.getAllTasks();

    let index = tasks.findIndex( (t:any) => t.id == id);

    if(index >= 0) {
      tasks.splice(index, 1);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
