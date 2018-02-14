import { Component, ViewChild } from '@angular/core';
import { Platform,Nav,Menu, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EvenementPage } from '../pages/evenement/evenement';
import { ProfilPage } from '../pages/profil/profil';
import { AccueilPage } from '../pages/accueil/accueil';
import { LoginPage } from '../pages/login/login';
import { StorageUtils } from '../Utils/storage.utils';
import { User } from '../Classes/user';
import firebase from 'firebase';
import { RecommendationPage } from '../pages/recommendation/recommendation';
import { UserServiceProvider } from '../providers/user-service/user-service';
import {InscriptionValidationPage} from "../pages/inscription-validation/inscription-validation";
import { UpdatePasswordPage } from '../pages/update-password/update-password';
import { OrderByPipe } from "./orderby.pipe";
import { FavorisPage } from '../pages/favoris/favoris';

import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { CacheService } from "ionic-cache";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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
  use:User 
  utilisateur: any;
  photo: any;
  url: any;

  constructor(private googlePlus: GooglePlus, private facebook: Facebook, public userService:UserServiceProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController, private events: Events, public storage: Storage, cache: CacheService) {

    this.token = StorageUtils.getToken();
    cache.setDefaultTTL(60 * 60 * 12); //set default cache TTL for 1 hour


    // Keep our cached results when device is offline!
    //cache.setOfflineInvalidate(false);
    console.log(this.token);
    this.use = StorageUtils.getAccount();
    

    events.subscribe('user:signedIn', (userEventData) => {
      this.token = StorageUtils.getToken();
      this.use = StorageUtils.getAccount();
      console.log(this.token);
      console.log(this.use);
    });
    

    if(this.token != null){
      this.storage.set('name', '0');
      this.storage.get('name').then((val) => {
        console.log('Your name is', val);
        this.isPub = val;
      })
      this.rootPage = AccueilPage;
      this.getUserInfos();

    }
    else{
      this.rootPage = LoginPage;
    }

    if(this.token != null){
      setTimeout(() => { // <=== 
        StorageUtils.removeToken();
        StorageUtils.removeAccount();
        this.nav.setRoot(LoginPage);
      }, +this.use.expireTime);
    }
    

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
      {icon: 'star', title: 'Favoris', component: FavorisPage,visible: '1'},
      {icon: 'person', title: 'Profil', component: ProfilPage,visible: '1'},
      {icon: 'share', title: 'Partager', component: 'ActualitesPage',visible: '1'},
      {icon: 'mail', title: 'Nous contacter', component: 'ActualitesPage',visible: '1'}
    ];
    this.pages2 = 
    [
      {icon: 'settings', title: 'Paramètres', component: UpdatePasswordPage, visible: '1'}
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
    StorageUtils.removeAccount();
    this.nav.setRoot(LoginPage);
    this.menu.close();
    this.userService.disconnect();
  }

  doFbLogout(){
		this.facebook.logout()
		.then(function(response) {
			//user logged out so we will remove him from the NativeStorage
      StorageUtils.removeToken();
      StorageUtils.removeAccount();
      this.nav.setRoot(LoginPage);
		}, function(error){
			console.log(error);
		});
  }
  
  doGoogleLogout(){
    this.googlePlus.logout()
    .then(function (response) {
      StorageUtils.removeToken();
      StorageUtils.removeAccount();
      this.nav.setRoot(LoginPage);
    },function (error) {
      console.log(error);
    })
  }

  getUserInfos(){
    //loader.present().then(() => {
      this.userService.getInfoUser().subscribe(
        data => {
            this.utilisateur = data.user; 
            this.url =data.urls;
            console.log(this.utilisateur);
                if(data.status == 0){
                  console.log(this.utilisateur);
                  this.photo = this.utilisateur.photo;
                }
                else{
                  let titre ="Pas d'utilisateu  a afficher";
                  
                }
            },
            err => {
                console.log(err);
                
                let titre ="Une erreur est survenue reessayer plus tard ";
                //this.presentPromptOk(titre);
            },
            () => {}
      );
    //})

  }
}

