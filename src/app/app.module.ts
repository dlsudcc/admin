import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { firebaseConfig } from 'src/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseService } from './shared/firebase.service';
import { getFirestore } from 'firebase/firestore';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    AdminModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Firebase initialization
    provideFirestore(() => getFirestore()), // Firestore provider
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

