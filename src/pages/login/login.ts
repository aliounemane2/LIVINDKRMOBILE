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
import { Toast } from '@ionic-native/toast';
import { GooglePlus } from '@ionic-native/google-plus';


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

  constructor(private googlePlus: GooglePlus, private toast : Toast, 
    public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder ,
    private alertCtrl: AlertController,private userService:UserServiceProvider, 
    public loading: LoadingController,public viewCtrl: ViewController, 
    public locations: LocationsProvider,private facebook: Facebook) {
  	
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

  doGoogleLogin(){
    let nav = this.navCtrl;
    let env = this;
    let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then(function (user) {
      loading.dismiss();
      this.showToast(user);
      if(user){
        StorageUtils.setToken(JSON.stringify(user.displayName));
        this.navCtrl.setRoot(AccueilPage);
      }
      else{
        this.showToast("Une erreur s'est produite réessayer plus tard");

      }
  
      /*env.nativeStorage.setItem('user', {
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      })
      .then(function(){
        nav.push(AccueilPage);
      }, function (error) {
        console.log(error);
      })*/
    }, function (error) {
      loading.dismiss();
      this.showToast(error);
    });
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'center').subscribe(
      toast => {
        //console.log(toast);
      }
    );
  }

}
