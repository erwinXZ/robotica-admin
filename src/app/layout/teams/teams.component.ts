import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';
import { TeamsService } from '../../services/teams.service';
import { ActivatedRoute } from '@angular/router';

export interface Teams {
    city: string;
    department: string;
    name: string;
    score: number;
    logout_datetime: Date;
    photoUrl: string;
  }

export interface TeamId extends Teams {
    id: string;
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  animations: [routerTransition()]
})
export class TeamsComponent implements OnInit, OnDestroy {
    loadTeams: boolean;
    nameCollection: string = '';
    imgUrl: string = '';
    teamsServices: any;
    teams = null;
    item: any;
    sub: any;

    constructor(teamsService: TeamsService) {
        this.loadTeams = true;
        this.teamsServices = teamsService;
    }

    ngOnInit() {
        this.getTeams();
        console.log(this.teamsServices.getPublications);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public getTeams() {
        this.sub = this.teamsServices.getTeams()
        .subscribe(
          data => {
            this.teams = data;
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    }

    public delete(id) {
        this.teamsServices.deletePublication(id);
    }
}
