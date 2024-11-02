// src/app/firebase.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { PasswordUtils } from './utils/password-util';
import { getDocs, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { LoginForm } from '../login/login';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  async add(data: any, collectionName: string): Promise<void> {
    const dat = collection(this.firestore, collectionName);
    let arr = {};
    for (const [key, value] of Object.entries(data)) {
      if (key == 'password') {
        arr[key] = PasswordUtils.encryptData(value);
        continue;
      }
      arr[key] = value;
    }
    await addDoc(dat, arr);
  }

  
  async login(email: string, password: string): Promise<any> {
    const usersCollection = collection(this.firestore, 'users');
    const userQuery = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(userQuery);

    for (const doc of querySnapshot.docs) {
      const form = new LoginForm();
      form.fill(doc.data());
      if (PasswordUtils.decryptData(form.password).replace(/"/g, '') === password) {
        return { id: doc.id, ...form };
      }
    }
    throw new Error('Invalid email or password'); // Throw error if login fails
  }
}