import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.scss'],
  animations: [routerTransition()]
})
export class EditNotificationComponent implements OnInit, OnDestroy {
    notsServices: any;
    path: string = '';
    notsItems: any;
    options: number;
    sub: any;
    id: string;

    constructor(private route: ActivatedRoute, notificationsService: NotificationsService, private db: AngularFirestore, private router: Router) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
         });
        this.notsServices = notificationsService;
        this.notsServices.getOneNotification(this.id).subscribe((result) => {console.log(this.notsItems = result); },
        error => {
          console.log(error);
        });
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    public editNotification() {
        this.notsServices.editNotification(this.notsItems);
        this.router.navigate(['/notifications']);
    }

}
