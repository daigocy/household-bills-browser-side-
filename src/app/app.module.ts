import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { TodayComponent } from './bill/today/today.component';
import { HistoryComponent } from './bill/history/history.component';
import { TimeComponent } from './statistics/time/time.component';
import { CategoryComponent } from './statistics/category/category.component';
import { AppRoutingModule } from './/app-routing.module';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './bill/home/home.component';
import { EditorComponent } from './bill/editor/editor.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    SidebarComponent,
    MenuComponent,
    TodayComponent,
    HistoryComponent,
    TimeComponent,
    CategoryComponent,
    Error404Component,
    HomeComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
