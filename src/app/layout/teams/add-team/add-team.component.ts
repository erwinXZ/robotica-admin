import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { TeamsService } from '../../../services/teams.service';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export interface Teams {
    city: string;
    department: string;
    name: string;
    score: number;
    logout_datetime: Date;
    photoUrl: string;
  }

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
  animations: [routerTransition()]
})
export class AddTeamComponent implements OnInit, OnDestroy {
    teamsServices: any;
    path: string = '';
    teamItems: any = {
        name: '',
        city: '',
        department: '',
        score: 0
    };
    sub: any;
    id: string;

    constructor(teamsService: TeamsService, private storage: AngularFireStorage, private db: AngularFirestore, private router: Router) {
        this.teamsServices = teamsService;
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        // this.downloadURL.unsubscribe();
        // this.newsServices.unsubscribe();
    }

    public addTeam() {
        this.teamsServices.addTeam(this.teamItems);
        this.router.navigate(['/teams']);
    }

}
