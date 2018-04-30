import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';
import { SolutionsService } from '../../services/solutions.service';
import { TeamsService } from '../../services/teams.service';
import { ActivatedRoute } from '@angular/router';

export interface Solutions {
    imageUrl: string;
    videoUrl: string;
    documentUrl: string;
    likes: number;
    description: string;
    title: string;
    publication_date: Date;
    comments: number;
    filePath: string;
    public: boolean;
    id_team: string;
    name: string;
    photoUrl: string;
  }

export interface NewId extends Solutions {
    id: string;
}

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
  animations: [routerTransition()]
})
export class SolutionsComponent implements OnInit, OnDestroy {
    loadSolutions: boolean;
    nameCollection: string = '';
    imgUrl: string = '';
    solsServices: any;
    teamsServices: any;
    sols = null;
    teams = null;
    item: any;
    sub: any;
    sub1: any;

    constructor(solsServices: SolutionsService, teamsServices: TeamsService) {
        this.loadSolutions = true;
        this.solsServices = solsServices;
        this.teamsServices = teamsServices;
    }

    ngOnInit() {
        this.getSolutions();
        this.getTeams();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
    }

    public getSolutions() {
        this.sub = this.solsServices.getSolutions()
        .subscribe(
          data => {
            this.sols = data;
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    }

    public getTeams() {
        this.sub1 = this.teamsServices.getTeams()
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
}
