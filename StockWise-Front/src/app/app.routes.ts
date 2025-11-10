import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Login } from './auth/login/login';

export const routes: Routes = [
   {path:'', component: Login},
   {path:'home', component:HomePage}
   
];
