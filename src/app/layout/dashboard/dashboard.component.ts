import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TeamsService } from '../../services/teams.service';
import { NotificationsService } from '../../services/notifications.service';
import { MembersService } from '../../services/members.service';
import { SolutionsService } from '../../services/solutions.service';
import { PublicationsService } from '../../services/publications.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit, OnDestroy {
    public sliders: Array<any> = [];
    teamsServices: any;
    notificationsServices: any;
    membersServices: any;
    solutionsServices: any;
    publicationsServices: any;
    teamsSub: any;
    solutionsSub: any;
    membersSub: any;
    notificationsSub: any;
    publicationsSub: any;
    teamsSize: number;
    solutionsSize: number;
    membersSize: number;
    notificationsSize: number;
    publicationsSize: number;

    constructor(teamsServices: TeamsService, notificationsServices: NotificationsService, membersServices: MembersService,
        solutionsServices: SolutionsService, publicationsServices: PublicationsService) {
        this.teamsServices = teamsServices;
        this.notificationsServices = notificationsServices;
        this.membersServices = membersServices;
        this.solutionsServices = solutionsServices;
        this.publicationsServices = publicationsServices;
        this.sliders.push(
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'First Global',
                text:
                    'Annual international robotics Olympics'
            }
            // {
            //     imagePath: 'assets/images/slider2.jpg',
            //     label: 'Second slide label',
            //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            // },
            // {
            //     imagePath: 'assets/images/slider3.jpg',
            //     label: 'Third slide label',
            //     text:
            //         'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            // }
        );
    }

    ngOnInit() {
        this.countTeams();
        this.countSolutions();
        this.countNotifications();
        this.countMembers();
        this.countPublications();
    }

    ngOnDestroy() {
        this.teamsSub.unsubscribe();
        this.solutionsSub.unsubscribe();
        this.membersSub.unsubscribe();
        this.notificationsSub.unsubscribe();
        this.publicationsSub.unsubscribe();
    }

    countTeams() {
        this.teamsSub = this.teamsServices.getTeams()
        .subscribe(
          data => {
            this.teamsSize = data.length;
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    }
    countSolutions() {
        this.solutionsSub = this.solutionsServices.getSolutions()
        .subscribe(
          data => {
            this.solutionsSize = data.length;
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    }
    countMembers() {
        this.membersSub = this.membersServices.getMembers()
        .subscribe(
          data => {
            this.membersSize = data.length;
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    }
    countNotifications() {
        this.notificationsSub = this.notificationsServices.getNotifications()
        .subscribe(
          data => {
            this.notificationsSize = data.length;
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    }
    countPublications() {
        this.publicationsSub = this.publicationsServices.getPublications()
        .subscribe(
          data => {
            this.publicationsSize = data.length;
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    }

}
