import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {StorageUtils} from '../../Utils/storage.utils';
import {User} from '../../Classes/user';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { InscriptionPage } from '../inscription/inscription';
import { AccueilPage } from '../accueil/accueil';
import { PublicitePage } from '../publicite/publicite';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	myFormulaire: FormGroup;
  	user : any;
    users: any;
    token: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder ,private alertCtrl: AlertController,private userService:UserServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, public storage: Storage, private toastCtrl: ToastController) {
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
    this.getUsers();
    
    
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

  goToAccueil(){
    this.navCtrl.setRoot(AccueilPage);
  }

  doLogin(){
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
                //console.log(this.user);
                if(this.user.message=='ok')
                {
                  //console.log(this.user);
                  
                  let loginData:any = this.user;
                  let user:User = this.userService.readJwt(loginData.token);
                  //console.log(user);
                  user.username = json.login;
                  user.password = json.motpasse;
                  user.id =this.user.user.id;
                  user.firstName = this.user.user.prenom;
                  user.lastName = this.user.user.nom;
                  user.email = this.user.user.email;
                  //console.log(user.id);
                  //console.log('Remember me: Store user and jwt to local storage');
                  StorageUtils.setAccount(user);
                  StorageUtils.setToken(loginData.token);
                  //console.log('Login successful', user);
                  this.viewCtrl.dismiss();
                  //this.events.publish('user:signedIn', user);
                  //this.events.publish('user:home', user);
                  //this.events.publish('user:loadTabs', user);
                }else if (this.user.message=='ko'){
                  /*var alert = this.alertCtrl.create({
                  title: "Message",
                  subTitle: "Connexion",
                  message: this.user.message,
                  buttons: ["close"]
                  });

                  alert.present();*/
                  let loginData:any = this.user;
                  //this.viewCtrl.dismiss();
                }
                else if (this.user.message=='noactive'){
                  //this.showToast(this.user.texte);
                  /*var alert = this.alertCtrl.create({
                  title: "Message",
                  subTitle: "Connexion",
                  message: this.user.texte,
                  buttons: ["close"]
                  });

                  alert.present();*/

                }
                else{
                  /*var alert = this.alertCtrl.create({
                  title: "Message",
                  subTitle: "Connexion",
                  message: this.user.message,
                  buttons: ["close"]
                  });

                  alert.present();*/
                  //this.showToast( this.user.message);

                }
                
            },
            err => {
                //console.log(err);
                loader.dismiss();
            },
            () => {loader.dismiss()}

          );
      });
    }
  }

  getUsers(){
    let loader = this.loading.create({
        content: 'Connexion en cours...',
      });

      loader.present().then(() => {
        this.userService.loginJson().subscribe(
            data => {
            this.users = data;
            console.log(this.users);

            },
            err => {
                console.log(err);
                loader.dismiss();
            },
            () => {loader.dismiss()}
            );
      });
  }

  loginJson(){
    console.log(this.users);
    if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
      this.presentToast("remplissez tous les champs!");
    }
    else{
      if(this.users != null){
        var json = this.myFormulaire.value;
        for(var i = 0; i < this.users.length; i++){
          if(json.login == this.users[i].username && json.motpasse == this.users[i].password){
            StorageUtils.setToken(json.login);
            this.storage.set('name', '0');
            
            //this.navCtrl.setRoot(PublicitePage);
            this.navCtrl.setRoot(AccueilPage);
             break;
          }
          else{
            console.log("Login ou mot de passe incorrect");
            this.presentToast("Login ou mot de passe incorrect");
          }  
        }
      }
      else{
        console.log("No users found");
      }
      
    }
  }

}
