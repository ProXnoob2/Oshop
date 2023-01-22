import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs';
import { AppUser } from 'shared/Models/app-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  userImage!: any;

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      imageUrl: user.photoURL,
    });
  }

  getAll() {
    return this.db
      .list<AppUser>('/users')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  update(userId: string | number, user: any) {
    this.userImage = user.imageUrl;
    return this.db.object('/users/' + userId).update(user);
  }

  remove(userId: string | number) {
    return this.db.object('/users/' + userId).remove();
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
