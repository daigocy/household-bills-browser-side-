import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import { TodayComponent } from './bill/today/today.component';
import { HistoryComponent } from './bill/history/history.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './bill/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'today', component: TodayComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
