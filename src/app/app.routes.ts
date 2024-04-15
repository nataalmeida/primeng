import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormTaskComponent } from './pages/form-task/form-task.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'form', component: FormTaskComponent },
  { path: 'form/:id', component: FormTaskComponent }
];
