import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { StorageUtils } from '../../Utils/storage.utils';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { InscriptionIneterestPage } from '../inscription-ineterest/inscription-ineterest';
import { Toast } from '@ionic-native/toast';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  myFormulaire: FormGroup;
  user: any;

  constructor(public connectivityService:ConnectvityServiceProvider, private toast : Toast, public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private alertCtrl: AlertController, public loading: LoadingController, public userService:UserServiceProvider, private toastCtrl: ToastController) {

  	this.myFormulaire = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(55), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'center').subscribe(
      toast => {
        //console.log(toast);
      }
    );
  }

   forgetPassword(){
    //this.connectivityService.checkNetwork();
    if(!this.myFormulaire.valid){
      console.log("Remplissez le champs!");
      //this.showToast("Le champ est obligatoire")
    }
    else{ 
      //this.connectivityService.checkNetwork();
      	var json = this.myFormulaire.value;
      	var valid = this.isValid(new FormControl(json.email));
      	if(valid == null){
      		let loader = this.loading.create({
		     content: 'Chargement en cours...',
		    });
		    
		    let user={email: json.email, id:0}
		    loader.present().then(() => {
		    this.userService.forgetPassword(user).subscribe(
		        data => {
		        	console.log(data);
			        if(data.status == 0){
			          
			        }
			        else{
			        	var subTitle ="Creation de compte";
		          		//this.presentToast(data.message);
		          		//this.showToast("Le code de validation est incorrect") 
			        }
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
      	else{
      		console.log('Email non valide');
        	//this.presentToast("Email non valide");
        	//this.showToast("Email non valide");

      	}
      	
    }
  }

  isValid(control: FormControl){

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);

    if (re){
      return null;
    }
    return {"invalidEmail": true};
  }

}
