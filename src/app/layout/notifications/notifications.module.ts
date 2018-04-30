import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';

import { AddNotificationComponent } from './add-notification/add-notification.component';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';

@NgModule({
    imports: [CommonModule, NotificationsRoutingModule, PageHeaderModule, FormsModule],
    declarations: [NotificationsComponent, AddNotificationComponent, EditNotificationComponent]
})
export class NotificationsModule {}

