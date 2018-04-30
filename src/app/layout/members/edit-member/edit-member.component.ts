import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss'],
  animations: [routerTransition()]
})
export class EditMemberComponent implements OnInit, OnDestroy {
    membersServices: any;
    memberItems: any;
    sub: any;
    id: string;

    constructor(private route: ActivatedRoute,
        membersService: MembersService,
        private storage: AngularFireStorage,
        private db: AngularFirestore,
        private router: Router) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.membersServices = membersService;
        this.membersServices.getOneMember(this.id).subscribe((result) => {console.log(this.memberItems = result); },
        error => {
          console.log(error);
        });
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    public editMember() {
        this.membersServices.editMember(this.memberItems);
        this.router.navigate(['/members']);
    }

}
