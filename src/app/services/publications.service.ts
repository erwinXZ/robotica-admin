import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export interface Publications {
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
  id_user: string;
  name: string;
  photoUrl: string;
}
export interface PublicationId extends Publications {
  id: string;
}

@Injectable()
export class PublicationsService {
  newCollection: AngularFirestoreCollection<Publications>;
  publications: Observable<Publications[]>;
  publicationsDoc: AngularFirestoreDocument<Publications>;
  oneNewDoc: AngularFirestoreDocument<Publications>;
  idPublication: string;
  bandLikes: boolean;

  constructor(private afs: AngularFirestore) {
    this.newCollection = this.afs.collection<Publications>('publications');
    this.publications = this.newCollection.valueChanges();
    this.idPublication = '';
    this.bandLikes = true;
  }

  youtube_parser(url) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        let match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }

  getOnePublication(id) {
    const document: AngularFirestoreDocument<Publications> = this.afs.doc('publications/' + id);
    const document$: Observable<Publications> = document.valueChanges();
    return document$;
  }
  getPublications() {
    return this.publications;
  }
  setIdPublication(id): void {
    this.idPublication = id;
  }
  getIdPublication(): string {
    return this.idPublication;
  }
  addPublication(publication) {
    let id = this.afs.createId();
    console.log(id);
    let post = {
      id: id,
      title: publication.title,
      description: publication.description,
      publication_date: new Date(),
      comments: 0,
      likes: 0,
      imageUrl: publication.imageUrl,
      videoUrl: this.youtube_parser(publication.videoUrl),
      documentUrl: publication.documentUrl,
      filePath: publication.filePath,
      public: publication.public,
      id_user: '4CpsPsRthNAO9YhD4Hhv',
      name: 'First Global Bolivia',
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/robotica-usfx.appspot.com/o/Bolivia.jpg?alt=media&token=dd702fa1-decb-42ca-b754-bfcefe063a1c'
    };
    return this.afs.collection('publications').doc(id).set(post);
  }

  editPublication(publication) {
    let post = {
      title: publication.title,
      description: publication.description,
      publication_date: publication.publication_date,
      comments: publication.comments,
      likes: publication.likes,
      imageUrl: publication.imageUrl,
      videoUrl: this.youtube_parser(publication.videoUrl),
      documentUrl: publication.documentUrl,
      filePath: publication.filePath,
      public: publication.public,
      name: publication.name,
      photoUrl: publication.photoUrl
    };
    return this.afs.collection('publications').doc(publication.id).update(post);
  }

  deletePublication(id) {
    this.afs.collection('publications').doc(id).delete();
  }


  getPagination() {
    return this.publications;
    // var first = db.collection("publications")
    // .orderBy("publications_date")
    // .where("public", "==", true)
    // .limit(2);

    // return first.get().then(function (documentSnapshots) {
    // // Get the last visible document
    // var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    // console.log("last", lastVisible);

    // // Construct a new query starting at this document,
    // // get the next 25 cities.
    // var next = db.collection("cities")
    //       .orderBy("population")
    //       .startAfter(lastVisible)
    //       .limit(25);
    // });
  }
}
