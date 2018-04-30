import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { ChallengesService } from '../../../services/challenges.service';
import { TeamsService } from '../../../services/teams.service';
import { MembersService } from '../../../services/members.service';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

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
@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.scss'],
  animations: [routerTransition()]
})
export class AddChallengeComponent implements OnInit {
    // Main task
    task: AngularFireUploadTask;
    // Progress monitoring
    percentage: Observable<number>;
    snapshot: Observable<any>;
    // Download URL
    downloadImageURL: Observable<string>;
    downloadDocumentURL: Observable<string>;
    // State for dropzone CSS toggling
    isHovering: boolean;
    challengesServices: any;
    imagePath: string = '';
    documentPath: string = '';
    challengeItems: any = {
        imageUrl: '',
        videoUrl: '',
        documentUrl: '',
        public: false,
        description: '',
        title: '',
        filePath: ''
    };
    imageUploaded: string = '';
    documentUploaded: string = '';

    constructor(private challengesService: ChallengesService, private storage: AngularFireStorage, private db: AngularFirestore, private router: Router) {
        this.challengesServices = challengesService;
    }

    ngOnInit() {

    }

    toggleHover(event: boolean) {
        this.isHovering = event;
      }

    startUploadImage(event: FileList) {
        // The File object
        const file = event.item(0);
        // Client-side validation example
        console.log(file.type.split('/')[0]);
        if (file.type.split('/')[0] !== 'image') {
          console.error('unsupported file type :( ');
          return;
        }

        // The storage path
        this.imagePath = `challenges/${new Date().getTime()}_${file.name}`;
        // Totally optional metadata
        const customMetadata = { app: 'My AngularFire-powered PWA!' };
        // The main task
        this.task = this.storage.upload(this.imagePath, file, { customMetadata });
        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot   = this.task.snapshotChanges();
        // The file's download URL
        this.downloadImageURL = this.task.downloadURL();
        this.downloadImageURL.subscribe(result => this.imageUploaded = result);
    }

    startUploadDocument(event: FileList) {
        // The File object
        const file = event.item(0);
        // Client-side validation example
        console.log(file.type.split('/')[0]);
        if (file.type.split('/')[0] !== 'image') {
            // The storage path
        this.documentPath = `challenges/${new Date().getTime()}_${file.name}`;
        // Totally optional metadata
        const customMetadata = { app: 'My AngularFire-powered PWA!' };
        // The main task
        this.task = this.storage.upload(this.documentPath, file, { customMetadata });
        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot   = this.task.snapshotChanges();
        // The file's download URL
        this.downloadDocumentURL = this.task.downloadURL();
        this.downloadDocumentURL.subscribe(result => this.documentUploaded = result);
        } else {
            console.error('unsupported file type :( ');
            return;
        }
    }


    deleteImageFileStorage() {
        this.storage.ref('/').child(this.imagePath).delete();
        this.downloadImageURL = null;
    }

    deleteDocumentFileStorage() {
        this.storage.ref('/').child(this.documentPath).delete();
        this.downloadDocumentURL = null;
    }

        // Determines if the upload task is active
    isActive(snapshot) {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }

    public addChallenge() {
        console.log(this.challengeItems.public);
        this.challengeItems.imagePath = this.imagePath;
        this.challengeItems.documentPath = this.imagePath;
        this.challengeItems.imageUrl = this.imageUploaded;
        this.challengeItems.documentUrl = this.documentUploaded;
        this.challengesServices.addChallenge(this.challengeItems);
        this.router.navigate(['/challenges']);
    }

}
