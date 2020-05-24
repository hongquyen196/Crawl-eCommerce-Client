import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './view/category/category.component';
import { CategoryDetailComponent } from './view/category-detail/category-detail.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchSendoComponent } from './view/sendo/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/category', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'category',
    children: [
      { path: '', component: CategoryComponent },
      { path: ':id', component: CategoryDetailComponent },
    ]
  },
  {
    path: 'sendo',
    children: [
      { path: 'search', component: SearchSendoComponent },
      { path: ':id', component: CategoryDetailComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
