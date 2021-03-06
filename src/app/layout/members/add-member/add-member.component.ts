import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { MembersService } from '../../../services/members.service';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export interface Members {
    birthday: string;
    cellphone: string;
    email: string;
    id_team: any;
    institution: string;
    name: string;
    surname: string;
    type: string;
}

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
  animations: [routerTransition()]
})
export class AddMemberComponent implements OnInit, OnDestroy {
    membersServices: any;
    memberItems: any = {
        birthday: '',
        cellphone: '',
        email: '',
        institution: '',
        name: '',
        surname: '',
        type: '',
    };
    sub: any;
    id: string;

    constructor(membersService: MembersService, private storage: AngularFireStorage, private db: AngularFirestore, private router: Router) {
        this.membersServices = membersService;
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        // this.downloadURL.unsubscribe();
        // this.newsServices.unsubscribe();
    }

    public addMember() {
        this.membersServices.addMember(this.memberItems);
        this.router.navigate(['/members']);
    }

}
