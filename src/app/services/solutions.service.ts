import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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

export interface SolutionId extends Solutions {
  id: string;
}

@Injectable()
export class SolutionsService {
  newCollection: AngularFirestoreCollection<Solutions>;
  solutions: Observable<Solutions[]>;
  solutionsDoc: AngularFirestoreDocument<Solutions>;
  oneNewDoc: AngularFirestoreDocument<Solutions>;
  idSolution: string;
  bandLikes: boolean;

  constructor(private afs: AngularFirestore) {
    this.newCollection = this.afs.collection<Solutions>('solutions', ref => {
        return ref
            .orderBy('id_team', 'desc');
    });
    this.solutions = this.newCollection.valueChanges();
    this.idSolution = '';
    this.bandLikes = true;
  }

  getOneSolution(id) {
    const document: AngularFirestoreDocument<Solutions> = this.afs.doc('publications/' + id);
    const document$: Observable<Solutions> = document.valueChanges();
    return document$;
  }
  getSolutions() {
    return this.solutions;
  }
  setIdSolution(id): void {
    this.idSolution = id;
  }
  getIdSolution(): string {
    return this.idSolution;
  }
}
