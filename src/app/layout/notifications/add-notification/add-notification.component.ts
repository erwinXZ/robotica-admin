import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AngularFirestore } from 'angularfire2/firestore';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { NotificationsService } from '../../../services/notifications.service';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export interface Notifications {
    text: string;
    type: string;
    notification_date: Date;
}
@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss'],
  animations: [routerTransition()]
})
export class AddNotificationComponent implements OnInit, OnDestroy {
    notsServices: any;
    path: string = '';
    notsItems: any = {
        text: '',
        type: ''
    };
    options: number;
    sub: any;

    constructor(notificationsService: NotificationsService, private db: AngularFirestore, private router: Router) {
        this.notsServices = notificationsService;
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    public addNotification() {
        this.notsServices.addNotification(this.notsItems);
        this.router.navigate(['/notifications']);
    }

}
