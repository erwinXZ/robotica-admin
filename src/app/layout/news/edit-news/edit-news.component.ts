import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute } from '@angular/router';
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
}
@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss'],
  animations: [routerTransition()]
})
export class EditNewsComponent implements OnInit {
    // Main task
    task: AngularFireUploadTask;
    // Progress monitoring
    percentage: Observable<number>;
    snapshot: Observable<any>;
    // Download URL
    downloadURL: Observable<string>;
    // State for dropzone CSS toggling
    isHovering: boolean;
    newsServices: any;
    path: string = '';
    newsItems: any = {};
    imageUploaded: string = '';
    options: number;
    id: string;
    constructor(private route: ActivatedRoute, newsService: PublicationsService, private storage: AngularFireStorage, private db: AngularFirestore, private router: Router) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
         });
        this.newsServices = newsService;
        this.newsServices.getOnePublication(this.id).subscribe((result) => {console.log(this.newsItems = result); },
        error => {
          console.log(error);
        });
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    startUpload(event: FileList) {
        // Delete previous path
        this.storage.ref('').child(this.newsItems.filePath).delete();
        this.newsItems.imageUrl = null;
        // The File object
        const file = event.item(0);
        // Client-side validation example
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
        this.downloadURL.subscribe(result => this.newsItems.imageUrl = result);
    }

    // Determines if the upload task is active
    isActive(snapshot) {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }

    ngOnInit() {
        this.setOptions();
    }

    public setOptions() {
        if (this.newsItems.imageUrl === '') {
            this.options = 1;
        }
        this.options = 2;
    }

    public editNews() {
        this.newsServices.editPublication(this.newsItems);
        this.router.navigate(['/news']);
    }

}
