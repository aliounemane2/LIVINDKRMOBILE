import { Component, ViewChild } from '@angular/core';
import { Platform,Nav,Menu, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EvenementPage } from '../pages/evenement/evenement';
import { ProfilPage } from '../pages/profil/profil';
import { AccueilPage } from '../pages/accueil/accueil';
import { LoginPage } from '../pages/login/login';
import { StorageUtils } from '../Utils/storage.utils';
import firebase from 'firebase';
import { RecommendationPage } from '../pages/recommendation/recommendation';
//import {OrderByPipe} from "../pages/evenement/evenement";
import {OrderByPipe} from "./orderby.pipe";

import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';

declare var FCMPlugin;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any ;
  pages: Array<{icon: string, title: string, component: any, visible: string}>;
  pages2: Array<{icon: string, title: string, component: any, visible: string}>;
  token: any;
  isPub: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController, private events: Events, public storage: Storage) {

    this.token = StorageUtils.getToken();
    console.log(this.token);
    

    if(this.token != null){
      this.storage.set('name', '0');
      this.storage.get('name').then((val) => {
        console.log('Your name is', val);
        this.isPub = val;
      })
      this.rootPage = AccueilPage;
    }
    else{
      this.rootPage = LoginPage;
    }

    /*setTimeout(() => { // <=== 
      StorageUtils.setToken('');
    }, 10000);*/

    firebase.initializeApp({
        apiKey: "AIzaSyCgQIx5LtwALH3ctsIkqkKo-f8n2PpdVfE",
        authDomain: "livindakar.firebaseapp.com",
        databaseURL: "https://livindakar.firebaseio.com/",
        storageBucket: "livindakar.appspot.com",
        messagingSenderId: "358136605028"
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      /*FCMPlugin.getToken(
        (t) => {
          console.log(t);
        },
        (e) => {
          console.log(e);
        }
      );

      FCMPlugin.onNotification(
        (data) => {
          console.log(data);
        },
        (e) => {
          console.log(e);
        }
      );*/
    });

    this.pages = 
    [
      {icon: 'home', title: 'Accueil', component: AccueilPage,visible: '1'},
      {icon: 'list-box', title: 'Recommendations', component: RecommendationPage,visible: '1'},
      {icon: 'star', title: 'Favoris', component: 'ActualitesPage',visible: '1'},
      {icon: 'person', title: 'Profil', component: ProfilPage,visible: '1'},
      {icon: 'share', title: 'Partager', component: 'ActualitesPage',visible: '1'},
      {icon: 'mail', title: 'Nous contacter', component: 'ActualitesPage',visible: '1'}
    ];
    this.pages2 = 
    [
      {icon: 'settings', title: 'Paramètres', component: 'ActualitesPage',visible: '1'}
    ];
  }

  openPage(page) {
  // navigate to the new page if it is not the current page
    if(page.title == 'Accueil'){
      this.storage.set('name', '1');
    }
    if(page.component =='ActualitesPage'){

    }
    else{
      this.menu.enable(true);
      this.nav.setRoot(page.component);
      this.menu.close();
    }  
  }

  logout():void {
    StorageUtils.removeToken();
    this.nav.setRoot(LoginPage);
    this.menu.close();
  }
}

