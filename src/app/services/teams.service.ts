import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export interface Teams {
  city: string;
  department: string;
  name: string;
  score: number;
  logout_datetime: Date;
  photoUrl: string;
}
export interface TeamId extends Teams {
  id: string;
}

@Injectable()
export class TeamsService {
  newCollection: AngularFirestoreCollection<Teams>;
  teams: Observable<Teams[]>;
  teamsDoc: AngularFirestoreDocument<Teams>;
  oneNewDoc: AngularFirestoreDocument<Teams>;
  idTeam: string;
  bandLikes: boolean;

  constructor(private afs: AngularFirestore) {
    this.newCollection = this.afs.collection<Teams>('teams');
    this.teams = this.newCollection.valueChanges();
    this.idTeam = '';
    this.bandLikes = true;
  }

  getOneTeam(id) {
    const document: AngularFirestoreDocument<Teams> = this.afs.doc('teams/' + id);
    const document$: Observable<Teams> = document.valueChanges();
    return document$;
  }
  getTeams() {
    return this.teams;
  }
  setIdTeam(id): void {
    this.idTeam = id;
  }
  getIdTeam(): string {
    return this.idTeam;
  }
  addTeam(team) {
    let id = this.afs.createId();
    console.log(id);
    let post = {
      id: id,
      name: team.name,
      city: team.city,
      department: team.department,
      score: team.score,
      logout_datetime: new Date(),
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/robotica-usfx.appspot.com/o/teamsProfile%2Frobot.png?alt=media&token=3ef586c7-13aa-440d-ae4d-136642285018'
      };
    return this.afs.collection('teams').doc(id).set(post);
  }

  editTeam(team) {
    let post = {
        name: team.Nombre,
        city: team.Ciudad,
        department: team.Departamento,
        score: team.score,
        logout_datetime: team.logout_datetime,
        photoUrl: team.photoUrl
    };
    return this.afs.collection('teams').doc(team.id).update(post);
  }

  deleteTeam(id) {
    this.afs.collection('teams').doc(id).delete();
  }

//   countTeams() {
//     db.collection('products').get().then(res => console.log(res.size))
//   }
}
