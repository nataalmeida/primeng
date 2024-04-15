import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'card-task-list',
  standalone: true,
  imports: [CardModule,ButtonModule, TieredMenuModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './card-task-list.component.html',
  styleUrl: './card-task-list.component.scss'
})

export class CardTaskListComponent {
  items!: MenuItem[];
  statusClass!:string;
  @Input() task:any = {};
  @Output() deleteTask = new EventEmitter<string>();

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.items = [
      {
          label: 'Editar',
          icon: 'pi pi-refresh',
          command: (event) => {
            this.update();
          }
      },
      { separator: true },
      {
        label: 'Excluir',
        icon: 'pi pi-trash',
        command: (event) => {
          this.delete(this.task.id);
        }
      }
    ];
  }

  ngOnInit() {
    this.defineStatusClass();
  }

  defineStatusClass(){
    if(this.task.status == 'pending') {
      this.statusClass = 'card-task--pending';
    } else if (this.task.status == 'in_progress') {
      this.statusClass = 'card-task--in-progress';
    } else {
      this.statusClass = 'card-task--completed';
    }
  }

  update() {
    this.router.navigate(['form', this.task.id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir essa tarefa?',
      header: 'Excluir tarefa',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.taskService.deleteTask(id);
        this.deleteTask.emit();
      },
      reject: () => {
        return;
      }
    });
  }
}
