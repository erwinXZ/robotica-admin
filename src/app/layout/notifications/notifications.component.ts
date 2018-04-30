import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from '../../services/notifications.service';
import { ActivatedRoute } from '@angular/router';

export interface Notifications {
    text: string;
    type: string;
    notification_date: Date;
}

export interface NotificationId extends Notifications {
    id: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [routerTransition()]
})
export class NotificationsComponent implements OnInit, OnDestroy {
    loadNotifications: boolean;
    nameCollection: string = '';
    notificationsServices: any;
    nots = null;
    item: any;
    sub: any;

    constructor(notificationsService: NotificationsService) {
        this.loadNotifications = true;
        this.notificationsServices = notificationsService;
    }

    ngOnInit() {
        this.getNotifications();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public getNotifications() {
        this.sub = this.notificationsServices.getNotifications()
        .subscribe(
          data => {
            this.nots = data;
          },
          err => {
            console.log(err);
          }
        );
    }

    public delete(id) {
        this.notificationsServices.deleteNotification(id);
    }
}
