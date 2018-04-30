import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';

const routes: Routes = [
    {path: '', component: NewsComponent},
    {path: 'add-news', component: AddNewsComponent},
    {path: 'edit-news/:id', component: EditNewsComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NewsRoutingModule {
}
