import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';
import { MembersService } from '../../services/members.service';
import { TeamsService } from '../../services/teams.service';
import { ActivatedRoute } from '@angular/router';

export interface Members {
    birthday: string;
    cellphone: string;
    email: string;
    id_team: string;
    institution: string;
    name: string;
    surname: string;
    type: string;
  }

export interface MemberId extends Members {
    id: string;
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: [routerTransition()]
})
export class MembersComponent implements OnInit, OnDestroy {
    loadMembers: boolean;
    nameCollection: string = '';
    membersServices: any;
    teamsServices: any;
    members = null;
    teams = null;
    item: any;
    sub: any;
    sub1: any;

    constructor(membersService: MembersService, teamsService: TeamsService) {
        this.loadMembers = true;
        this.membersServices = membersService;
        this.teamsServices = teamsService;
    }

    ngOnInit() {
        this.getMembers();
        this.getTeams();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
    }

    public getMembers() {
        this.sub = this.membersServices.getMembers()
        .subscribe(
          data => {
            this.members = data;
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    }

    public delete(id) {
        this.membersServices.deleteMembers(id);
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
