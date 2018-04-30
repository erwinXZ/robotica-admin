import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


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
export interface ChallengenId extends Challenges {
  id: string;
}

@Injectable()
export class ChallengesService {
  newCollection: AngularFirestoreCollection<Challenges>;
  challenges: Observable<Challenges[]>;
  challengesDoc: AngularFirestoreDocument<Challenges>;
  oneNewDoc: AngularFirestoreDocument<Challenges>;
  idChallenge: string;
  bandLikes: boolean;

  constructor(private afs: AngularFirestore) {
    this.newCollection = this.afs.collection<Challenges>('challenges');
    this.challenges = this.newCollection.valueChanges();
    this.idChallenge = '';
    this.bandLikes = true;
  }

  youtube_parser(url) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        let match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }

  getOneChallenge(id) {
    const document: AngularFirestoreDocument<Challenges> = this.afs.doc('challenges/' + id);
    const document$: Observable<Challenges> = document.valueChanges();
    return document$;
  }
  getChallenges() {
    return this.challenges;
  }
  setIdChallenge(id): void {
    this.idChallenge = id;
  }
  getIdChallenge(): string {
    return this.idChallenge;
  }
  addChallenge(publication) {
    let id = this.afs.createId();
    console.log(id);
    let post = {
      id: id,
      title: publication.title,
      description: publication.description,
      challenge_date: new Date(),
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
    return this.afs.collection('challenges').doc(id).set(post);
  }

  editChallenge(publication) {
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
      id_user: '4CpsPsRthNAO9YhD4Hhv',
      name: 'First Global Bolivia',
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/robotica-usfx.appspot.com/o/Bolivia.jpg?alt=media&token=dd702fa1-decb-42ca-b754-bfcefe063a1c'
    };
    return this.afs.collection('challenges').doc(publication.id).update(post);
  }

  deleteChallenge(id) {
    this.afs.collection('challenges').doc(id).delete();
  }
}
