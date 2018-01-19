import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageUtils } from '../../Utils/storage.utils';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { InscriptionIneterestPage } from '../inscription-ineterest/inscription-ineterest';

/**
 * Generated class for the InscriptionValidationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscription-validation',
  templateUrl: 'inscription-validation.html',
})
export class InscriptionValidationPage {
	myFormulaire: FormGroup;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private alertCtrl: AlertController, public loading: LoadingController, public userService:UserServiceProvider, private toastCtrl: ToastController) {

    if(navParams.get("user") !== "undefined")
    {
      this.user = navParams.get("user");
      console.log(this.user);
    }

  	this.myFormulaire = formBuilder.group({
      code: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]*'), Validators.required])]
    });
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionValidationPage');
  }

  goToIneterest(){
    this.navCtrl.push(InscriptionIneterestPage, {
      'inscription': 'inscription'
    });
  }

  goToCentreIneterest(){
    this.navCtrl.push(InscriptionIneterestPage, {
      'user': this.user
    });
  }

  codeValidation(){
  this.goToCentreIneterest();
    /*if(!this.myFormulaire.valid){
      console.log("Remplissez le champs!");
      this.presentToast("Remplissez le champs!");
    }
    else{
      //this.connectivityService.checkNetwork();
      let loader = this.loading.create({
      content: 'Chargement en cours...',
      });
      var json = this.myFormulaire.value;
      let codeVali = {idUser: this.user.idUser,activationToken: json.code};
	    loader.present().then(() => {
	    this.userService.validateCode(codeVali, this.user.idUser, json.code).subscribe(
	        data => {
		        if(data.status == 0){
		          this.goToCentreIneterest();
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
    }*/
  }

}
