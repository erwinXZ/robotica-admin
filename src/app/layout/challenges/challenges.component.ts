import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';
import { ChallengesService } from '../../services/challenges.service';

export interface Challenges {
    imageUrl: string;
    videoUrl: string;
    documentUrl: string;
    likes: number;
    description: string;
    title: string;
    publication_date: Date;
    comments: number;
    imagePath: string;
    documentPath: string;
    public: boolean;
    id_user: string;
    name: string;
    photoUrl: string;
}
export interface NewId extends Challenges {
    id: string;
}

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
  animations: [routerTransition()]
})

export class ChallengesComponent implements OnInit, OnDestroy {
    loadChallenges: boolean;
    nameCollection: string = '';
    challengesServices: any;
    challenges = null;
    item: any;
    sub: any;

    constructor(challengesServices: ChallengesService) {
        this.loadChallenges = true;
        this.challengesServices = challengesServices;
    }

    ngOnInit() {
        this.getChallenges();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public getChallenges() {
        this.sub = this.challengesServices.getChallenges()
        .subscribe(
            data => {
                this.challenges = data;
            },
            err => {
                console.log(err);
            }
        );
    }

    public delete(id) {
        this.challengesServices.deleteChallenge(id);
    }
}
