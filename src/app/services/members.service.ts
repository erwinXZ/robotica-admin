import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export interface Members {
  birthday: Date;
  cellphone: string;
  email: string;
  id_team: any;
  institution: string;
  name: string;
  surname: string;
  type: string;
}

export interface MembersId extends Members {
  id: string;
}

@Injectable()
export class MembersService {
  newCollection: AngularFirestoreCollection<Members>;
  members: Observable<Members[]>;
  membersDoc: AngularFirestoreDocument<Members>;
  oneNewDoc: AngularFirestoreDocument<Members>;
  idMember: string;
  bandLikes: boolean;

  constructor(private afs: AngularFirestore) {
    this.newCollection = this.afs.collection<Members>('members', ref => {
        return ref
            .orderBy('id_team', 'desc');
    });
    this.members = this.newCollection.valueChanges();
    this.idMember = '';
    this.bandLikes = true;
  }

  getOneMember(id) {
    const document: AngularFirestoreDocument<Members> = this.afs.doc('members/' + id);
    const document$: Observable<Members> = document.valueChanges();
    return document$;
  }

  getMembers() {
    return this.members;
  }
  setIdMember(id): void {
    this.idMember = id;
  }
  getIdMember(): string {
    return this.idMember;
  }
  addMember(member) {
    let id = this.afs.createId();
    console.log(id);
    let post = {
        id: id,
        birthday: member.birthday,
        cellphone: member.cellphone,
        email: member.email,
        institution: member.institution,
        name: member.name,
        surname: member.surname,
        type: member.type,
    };
    console.log(post);
    return this.afs.collection('members').doc(id).set(post);
  }

  editMember(member) {
    let post = {
        birthday: member.birthday,
        cellphone: member.cellphone,
        email: member.email,
        institution: member.institution,
        name: member.name,
        surname: member.surname,
        type: member.type,
    };
    return this.afs.collection('members').doc(member.id).update(post);
  }

  deletePublication(id) {
    this.afs.collection('members').doc(id).delete();
  }

//   getMembersTeams() {

//         // this.newCollection = this.afs.collection<Members>('members', ref => {
//         //     return ref
//         //         .orderBy('id_team', 'desc');
//         // });
//         // this.members = this.newCollection.valueChanges();

//         // var refe = this.afs.collection("teams").doc(key).ref;
//         // this.membersCollection = this.afs.collection("members", ref=>{
//         //   return ref.where('id_team', '==', refe);
//         // });

//         this.members = this.membersCollection.snapshotChanges().map(actions =>{
//           return actions.map(a=>{
//             const data = a.payload.doc.data() as Members;
//             const id = a.payload.doc.id;
//             return {id, ...data}
//           });
//         });

//         return this.members;
//   }
}
