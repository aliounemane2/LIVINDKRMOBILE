import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ViewController, ToastController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {StorageUtils} from '../../Utils/storage.utils';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { InscriptionValidationPage } from '../inscription-validation/inscription-validation';

/**
 * Generated class for the InscriptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})

export class InscriptionPage {
	myFormulaire: FormGroup;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private alertCtrl: AlertController, public loading: LoadingController, public userService:UserServiceProvider,public viewCtrl: ViewController, private toastCtrl: ToastController) {
  	this.myFormulaire = formBuilder.group({
      prenom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      nom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['',Validators.compose([Validators.maxLength(30), Validators.required])],
      telephone: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]*'), Validators.required]
      )],
      username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      motpasse: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      confirmmotpasse: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      residant: [''],
      indicatif: [''],
      sexe: [''],
      myDate: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  presentToast(message) {
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

  isValid(control: FormControl){

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);

    if (re){
      return null;
    }
    return {"invalidEmail": true};
  }

  createUser(){
    if(!this.myFormulaire.valid){
      console.log("Remplissez tous les champs!");
      let message = "Remplissez tous les champs!";
      //this.showToast("Remplissez tous les champs!");
      this.presentToast(message);
    }
    else{

      var json = this.myFormulaire.value;
      var valid = this.isValid(new FormControl(json.email));
      console.log(valid);
      if(valid == null){


      if(json.motpasse != json.confirmmotpasse){
        var message ="Les mots de passes ne sont pas identiques";
        var subTitle ="Mot de passe";
        this.presentToast(message);
        console.log("Les mots de passes ne sont pas identiques");
      }
      else{
        let loader = this.loading.create({
          content: 'Chargement en cours...',
        });
        loader.present().then(() => {

        let user = {email: json.email, nom: json.nom, prenom: json.prenom, dateNaissance: json.myDate,telephone: json.indicatif+json.telephone, pseudo:json.username, sexe: json.sexe, isDakar: json.residant, idUserProfil:1,password: json.motpasse} ;
        this.userService.createUser(user).subscribe(
            data => {
              console.log(data);
            if(data.status == 0){
              this.goToValidationPage(data.user);
              
            }
            else{
              var subTitle ="Creation de compte";
              this.presentToast(data.message);
              
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
      else{
        console.log('Email non valide');
        this.presentToast("Email non valide");
      }
      
    }
  }

  goToValidationPage(user){
    this.navCtrl.push(InscriptionValidationPage, {
      'user': user
    });
  }

  goToInscription(){
    var json = this.myFormulaire.value;
    if(json.residant){
      console.log(json.residant);
    }
    else{
      console.log(json.residant);
      this.presentToast("message");
    }
    console.log(json);
    this.navCtrl.push(InscriptionValidationPage, {
      'inscription': 'inscription'
    });

    /*var valid = this.isValid(new FormControl(json.email));
    console.log(valid);
    if(valid == null){
      this.navCtrl.push(InscriptionValidationPage, {
        'inscription': 'inscription'
      });
    }
    else{
      console.log('Email non valide');
      this.presentToast("Email non valide");
    }*/
    
  }


}
