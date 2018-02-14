import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageUtils } from '../../Utils/storage.utils';
import {User} from '../../Classes/user';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { InscriptionPage } from '../inscription/inscription';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { AccueilPage } from '../accueil/accueil';
import { PublicitePage } from '../publicite/publicite';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	myFormulaire: FormGroup;
  	user : any;
    users: any;
    token: any;

  constructor(public connectivityService:ConnectvityServiceProvider,private toast : Toast, public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder ,private alertCtrl: AlertController,private userService:UserServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, public storage: Storage, private toastCtrl: ToastController, private events: Events) {
  	this.myFormulaire = formBuilder.group({
  		login: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      motpasse: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])]
  	});

    this.token = StorageUtils.getToken();
    console.log(this.token);

    /*if(this.token != null){
      this.navCtrl.setRoot(AccueilPage);
      this.viewCtrl.dismiss();
       console.log('ok');
    }
    else{
      console.log('ko');
    }*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  presentToast(message) {

    //, private toastCtrl: ToastController
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle',
      cssClass: 'toast-class'

    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  goToInscription(){
  	this.navCtrl.push(InscriptionPage, {
   		'inscription': 'inscription'
    });
  }

  goToPassword(){
    this.navCtrl.push(ForgetPasswordPage, {
      'password': 'password'
    });
  }

  goToAccueil(){
    this.navCtrl.setRoot(AccueilPage);
  }

  doLogin(){
    //this.connectivityService.checkNetwork();
    if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
      this.presentToast("remplissez tous les champs!");
    }
    else
    {
      var json = this.myFormulaire.value;
      //this.connectivityService.checkNetwork();
      let loader = this.loading.create({
        content: 'Connexion en cours...',
      });

      loader.present().then(() => {

        this.userService.dologin(json.login,json.motpasse).subscribe(
            data => {
                this.user = data; 
                console.log(this.user);
                if(this.user.status=='0')
                {
                  
                  let loginData:any = this.user.key;
                  let use:User = this.userService.readJwt(loginData);
                  console.log(use);
                  use.username = json.login;
                  //console.log('Remember me: Store user and jwt to local storage');
                  StorageUtils.setAccount(use);
                  StorageUtils.setToken(loginData);
                  this.events.publish('user:signedIn', use);
                  //this.events.publish('user:home', user);
                  //this.events.publish('user:loadTabs', user);
                  this.navCtrl.setRoot(AccueilPage);
                }else {
                  //this.showToast("Login ou mot de passe incorrect");
                  this.presentToast(this.user.corps); 
                }   
            },
            err => {
              loader.dismiss();
              this.presentToast("Login ou mot de passe incorrect");
              //this.showToast("Login ou mot de passe incorrect");
              console.log(err);
              
            },
            () => {loader.dismiss()}

          );
      });
    }
  }


  showToast(titre){
    this.toast.show(titre, '5000', 'center').subscribe(
      toast => {
        //console.log(toast);
      }
    );
  }

}
