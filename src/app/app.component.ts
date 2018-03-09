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
import { EventServiceProvider } from '../providers/event-service/event-service';
import {InscriptionIneterestPage} from "../pages/inscription-ineterest/inscription-ineterest";
import { UpdatePasswordPage } from '../pages/update-password/update-password';
import { OrderByPipe } from "./orderby.pipe";
import { FavorisPage } from '../pages/favoris/favoris';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { CacheService } from "ionic-cache";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FCM } from '@ionic-native/fcm';

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

  constructor(private googlePlus: GooglePlus, private facebook: Facebook, 
    public userService:UserServiceProvider,public eventService:EventServiceProvider ,platform: Platform, 
    statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController, 
    private events: Events, public storage: Storage, cache: CacheService, 
    private socialSharing: SocialSharing) {

    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //"app_id": "1:358136605028:android:eb4d17d0e64c7e93",
      statusBar.styleDefault();

      this.token = StorageUtils.getToken();
      cache.setDefaultTTL(60 * 60 * 12); //set default cache TTL for 1 hour
  
  
      // Keep our cached results when device is offline!
      //cache.setOfflineInvalidate(false);
      console.log(this.token);
      this.use = StorageUtils.getAccount();

      events.subscribe('user:signedIn', (userEventData) => {
        StorageUtils.setToken(userEventData.token);
        this.token = StorageUtils.getToken();
        this.use = StorageUtils.getAccount();
        console.log(this.token);
        console.log(userEventData);
        console.log(this.use);
        this.getUserInfos();
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
        //this.rootPage = InscriptionIneterestPage;
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

      FCMPlugin.getToken(
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
          if(data.wasTapped){
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          }
        },
        (e) => {
          console.log(e);
        }
      );

      FCMPlugin.onTokenRefresh(function(token){
        alert( token );
      });

      FCMPlugin.subscribeToTopic('livindakar');

      FCMPlugin.unsubscribeFromTopic('livindakar');
      
      splashScreen.hide();
      
    });

    this.pages = 
    [
      {icon: 'home', title: 'Accueil', component: AccueilPage,visible: '1'},
      {icon: 'list-box', title: 'Recommendations', component: RecommendationPage,visible: '1'},
      {icon: 'star', title: 'Favoris', component: FavorisPage,visible: '1'},
      {icon: 'person', title: 'Profil', component: ProfilPage,visible: '1'},
      {icon: 'share', title: 'Partager', component: 'share',visible: '1'},
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
    else if(page.component =='share'){
      this.shareInfo();
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
      
      this.eventService.getInfoUser().subscribe(
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

  shareInfo(){
    this.socialSharing.share("L'application qui vous donne les bons endroits de Dakar en live", "Liv In Dakar", "", "http://www.qualshore.com").
    then(() => {
    //alert("Sharing success");
    // Success!
    }).catch(() => {
    // Error!
    //alert("Share failed");
    });
  }
}

