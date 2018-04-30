import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { PublicationsService } from '../../../services/publications.service';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export interface News {
    imageUrl: string;
    videoUrl: string;
    documentUrl: string;
    likes: number;
    description: string;
    title: string;
    publication_date: Date;
    filePath: string;
    public: boolean;
}

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
  animations: [routerTransition()]
})
export class AddNewsComponent implements OnInit, OnDestroy {
    // Main task
    task: AngularFireUploadTask;
    // Progress monitoring
    percentage: Observable<number>;
    snapshot: Observable<any>;
    // Download URL
    downloadURL: any;
    // State for dropzone CSS toggling
    isHovering: boolean;
    newsServices: any;
    path: string = '';
    newsItems: any = {
        imageUrl: '',
        videoUrl: '',
        documentUrl: '',
        public: false,
        description: '',
        title: '',
        filePath: ''
    };
    imageUploaded: string = '';
    options: number;
    sub: any;
    id: number;

    constructor(newsService: PublicationsService, private storage: AngularFireStorage, private db: AngularFirestore, private router: Router) {
        this.newsServices = newsService;
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        // this.downloadURL.unsubscribe();
        // this.newsServices.unsubscribe();
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    startUpload(event: FileList) {
        // The File object
        const file = event.item(0);
        // Client-side validation example
        console.log(file.type.split('/')[0]);
        if (file.type.split('/')[0] !== 'image') {
          console.error('unsupported file type :( ');
          return;
        }

        // The storage path
        this.path = `news/${new Date().getTime()}_${file.name}`;
        // Totally optional metadata
        const customMetadata = { app: 'My AngularFire-powered PWA!' };
        // The main task
        this.task = this.storage.upload(this.path, file, { customMetadata });
        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot   = this.task.snapshotChanges();
        // The file's download URL
        this.downloadURL = this.task.downloadURL();
        this.downloadURL.subscribe(result => this.imageUploaded = result);
    }

    deleteFileStorage() {
        this.storage.ref('/').child(this.path).delete();
        this.downloadURL = null;
    }

        // Determines if the upload task is active
    isActive(snapshot) {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }

    public addNews() {
        console.log(this.newsItems.public);
        this.newsItems.filePath = this.path;
        this.newsItems.imageUrl = this.imageUploaded;
        this.newsServices.addPublication(this.newsItems);
        this.router.navigate(['/news']);
    }

}
