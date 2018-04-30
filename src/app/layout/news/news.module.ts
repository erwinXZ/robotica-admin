import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';

import { AddNewsComponent } from './add-news/add-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';

import { DropZoneDirective } from '../../shared';
import { FileSizePipe } from '../../shared';


@NgModule({
    imports: [CommonModule, NewsRoutingModule, PageHeaderModule, FormsModule],
    declarations: [NewsComponent, AddNewsComponent, EditNewsComponent, DropZoneDirective, FileSizePipe]
})
export class NewsModule {}

