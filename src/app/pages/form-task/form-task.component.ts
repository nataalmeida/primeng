import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, DropdownModule, InputTextareaModule, CalendarModule, MessagesModule, ProgressSpinnerModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss'
})
export class FormTaskComponent {

  success = false;
  messages!:any;
  loadingPage = true;
  edit = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute){}

  optionStatus = [
    {label: 'Pendente', value: 'pending'},
    {label: 'Em andamento', value: 'in_progress'},
    {label: 'Concluída', value: 'completed'}
  ];

  taskForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(''),
    status: new FormControl('pending'),
    startDate: new FormControl(),
    completeDate: new FormControl(),
    description: new FormControl('')
  });

  ngOnInit() {
    this.taskForm.controls.startDate.setValue(new Date());

    this.route.params.subscribe( (params:any) => {
      if(params.id) {
        this.getDataTask(params.id);
        this.edit = true;
      }
      this.loadingPage = false;

    });
  }

  formatDateToString(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formatDay = day.toString().padStart(2, '0');
    const formatMonth = month.toString().padStart(2, '0');

    return `${formatDay}/${formatMonth}/${year}`;
  }

  convertDateStringToDate(dateStr: string) {
    const parts = dateStr.split("/");

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    return date;
}

  saveTask() {
    const payload = this.taskForm.value;
    payload.startDate = this.formatDateToString(payload.startDate);

    if(!this.edit) {
      this.taskService.createTask(payload);
      this.taskForm.reset();
      this.messages = [{ severity: 'success', summary: 'Tarefa cadastrada', detail: 'Sua tarefa foi cadastrada com sucesso!' }];
    } else {
      this.taskService.updateTask(payload)
      this.messages = [{ severity: 'success', summary: 'Tarefa alterada', detail: 'Sua tarefa foi alterada com sucesso!' }];
    }
  }

  getDataTask(id: number) {
    let task:any = this.taskService.getTaskById(id);

    if(task.length > 0) {
      this.taskForm.controls.id.setValue(task[0].id);
      this.taskForm.controls.title.setValue(task[0].title);
      this.taskForm.controls.description.setValue(task[0].description);
      this.taskForm.controls.status.setValue(task[0].status);
      this.taskForm.controls.completeDate.setValue(task[0].completeDate);
      this.taskForm.controls.startDate.setValue(this.convertDateStringToDate(task[0].startDate));

    }
  }

}
