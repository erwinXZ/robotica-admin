import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export interface Notifications {
  text: string;
  type: string;
  notification_date: Date;
}
export interface NotificationId extends Notifications {
  id: string;
}

@Injectable()
export class NotificationsService {
  newCollection: AngularFirestoreCollection<Notifications>;
  notifications: Observable<Notifications[]>;
  notificationsDoc: AngularFirestoreDocument<Notifications>;
  oneNewDoc: AngularFirestoreDocument<Notifications>;
  idNotification: string;
  bandLikes: boolean;

  constructor(private afs: AngularFirestore) {
    this.newCollection = this.afs.collection<Notifications>('notifications');
    this.notifications = this.newCollection.valueChanges();
    this.idNotification = '';
    this.bandLikes = true;
  }

  getOneNotification(id) {
    const document: AngularFirestoreDocument<Notifications> = this.afs.doc('notifications/' + id);
    const document$: Observable<Notifications> = document.valueChanges();
    return document$;
  }
  getNotifications() {
    return this.notifications;
  }
  setIdNotification(id): void {
    this.idNotification = id;
  }
  getIdNotification(): string {
    return this.idNotification;
  }
  addNotification(notification) {
    let id = this.afs.createId();
    console.log(id);
    let post = {
        id: id,
        text: notification.text,
        type: notification.type,
        notification_date: new Date(),
        name: 'First Global Bolivia',
        photoUrl: 'https://firebasestorage.googleapis.com/v0/b/robotica-usfx.appspot.com/o/Bolivia.jpg?alt=media&token=dd702fa1-decb-42ca-b754-bfcefe063a1c'
    };
    return this.afs.collection('notifications').doc(id).set(post);
  }

  editNotification(notification) {
    let post = {
        text: notification.text,
        type: notification.type,
        notification_date: notification.notification_date,
        name: notification.name,
        photoUrl: notification.photoUrl
    };
    return this.afs.collection('notifications').doc(notification.id).update(post);
  }

  deleteNotification(id) {
    this.afs.collection('notifications').doc(id).delete();
  }
}
