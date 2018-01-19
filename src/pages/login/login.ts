import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {StorageUtils} from '../../Utils/storage.utils';
import {User} from '../../Classes/user';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { LocationsProvider } from '../../providers/locations/locations';
import { HomePage } from '../home/home';
import { InscriptionPage } from '../inscription/inscription';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { AccueilPage } from '../accueil/accueil';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	myFormulaire: FormGroup;
  	user : any;
    userProfile: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder ,private alertCtrl: AlertController,private userService:UserServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, public locations: LocationsProvider,private facebook: Facebook) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage ');
  }

  goToHomePage(){
    this.navCtrl.push(HomePage, {
      'home': 'home'
    });
  }

  goToInscription(){
    this.navCtrl.push(InscriptionPage, {
      'inscription': 'inscription'
    });
  }

  facebookLogin(){
    this.facebook.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
            StorageUtils.setToken(JSON.stringify(success.displayName));
            this.navCtrl.setRoot(AccueilPage);
            //alert(JSON.stringify(success.displayName));
        })
        .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
            //alert(error);
        });

    }).catch((error) => { console.log(error);
      //alert(error+' 33');
       });
}

}
