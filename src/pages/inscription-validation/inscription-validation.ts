import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageUtils } from '../../Utils/storage.utils';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { InscriptionIneterestPage } from '../inscription-ineterest/inscription-ineterest';
import { Toast } from '@ionic-native/toast';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';
//private toast : Toast,

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

  constructor(public connectivityService:ConnectvityServiceProvider, private toast : Toast, public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private alertCtrl: AlertController, public loading: LoadingController, public userService:UserServiceProvider, private toastCtrl: ToastController) {

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

  goToCentreIneterest(user){
    this.navCtrl.push(InscriptionIneterestPage, {
      'user': user
    });
  }

  codeValidation(){
    //this.connectivityService.checkNetwork();
    if(!this.myFormulaire.valid){
      console.log("Remplissez le champs!");
      //this.presentToast("Remplissez le champs!");
      this.showToast("Le champ est obligatoire")
    }
    else{ 
      //this.connectivityService.checkNetwork();
      let loader = this.loading.create({
      content: 'Chargement en cours...',
      });
      var json = this.myFormulaire.value;
	    loader.present().then(() => {
	    this.userService.validateCode(json.code).subscribe(
	        data => {
            console.log(data);
		        if(data.status == 0){
		          this.goToCentreIneterest(data.user);
		        }
		        else{
		        	var subTitle ="Creation de compte";
              //this.presentToast(data.message);
              this.showToast("Le code de validation est incorrect")
		          
		        }
            //loader.dismiss();
	        },
	        err => {
	            console.log(err);
              loader.dismiss();
              this.showToast("Une erreur est survenue réessayer plus tard")
	        },
	        () => {loader.dismiss()}

	      );
	    });
    }
  }

  renvoyerCode(){
    //this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });
    loader.present().then(() => {
      this.userService.renvoyerCode(this.user.email).subscribe(
        data => {
          console.log(data);
          if(data.message == 0){
            this.goToCentreIneterest(this.user);
          }
          else{
            var subTitle ="Creation de compte";
            this.presentToast(data.message);
            //this.showToast("Le code de validation est incorrect")
            
          }
          loader.dismiss();
        },
        err => {
            console.log(err);
            loader.dismiss();
            //this.showToast("Une erreur est survenue réessayer plus tard")
        },
        () => {loader.dismiss()}
      );
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
