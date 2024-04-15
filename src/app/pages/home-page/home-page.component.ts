import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';

import { CardTaskListComponent } from '../../components/card-task-list/card-task-list.component';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    InputTextModule,
    RadioButtonModule,
    SelectButtonModule,
    CardTaskListComponent,
    FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent {
  constructor(private taskService: TaskService){}
  taskList:any[] = [];
  filter: string = 'all';

  ngOnInit() {
    this.setTasks();
  }

  setTasks() {
    this.taskList = [];
    let tasks = this.taskService.getAllTasks();
    tasks.forEach((task:any) => {
      this.taskList.push(task);
    })
  }

  filterTasks(status: string) {
    this.setTasks();
    if(status != 'all') {
      this.taskList = this.taskList.filter( (task) => task.status == status);
    }
  }
}
