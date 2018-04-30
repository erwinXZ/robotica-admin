import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';

const routes: Routes = [
    {path: '', component: NotificationsComponent},
    {path: 'add-notification', component: AddNotificationComponent},
    {path: 'edit-notification/:id', component: EditNotificationComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NotificationsRoutingModule {
}
