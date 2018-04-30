import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss'],
  animations: [routerTransition()]
})
export class EditTeamComponent implements OnInit, OnDestroy {
    teamsServices: any;
    path: string = '';
    teamItems: any = {
        score: 0
    };
    sub: any;
    id: string;

    constructor(private route: ActivatedRoute,
        teamsService: TeamsService,
        private storage: AngularFireStorage,
        private db: AngularFirestore,
        private router: Router) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.teamsServices = teamsService;
        this.teamsServices.getOneTeam(this.id).subscribe((result) => {console.log(this.teamItems = result); },
        error => {
          console.log(error);
        });
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    public editTeams() {
        this.teamsServices.editTeams(this.teamItems);
        this.router.navigate(['/teams']);
    }

}
