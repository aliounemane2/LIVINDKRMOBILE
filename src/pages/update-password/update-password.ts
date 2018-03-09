import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { StorageUtils } from '../../Utils/storage.utils';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { InscriptionIneterestPage } from '../inscription-ineterest/inscription-ineterest';
import { LoginPage } from '../login/login';
import { Toast } from '@ionic-native/toast';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

/**
 * Generated class for the UpdatePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage {
  @ViewChild('content') nav: Nav;
  myFormulaire: FormGroup;
  user: any;
  utilisateur: any;
  email: any;

  constructor(public connectivityService:ConnectvityServiceProvider, private toast : Toast, public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private alertCtrl: AlertController, public loading: LoadingController, public userService:UserServiceProvider, private toastCtrl: ToastController) {
  	this.myFormulaire = formBuilder.group({
      pwdnow: ['', Validators.compose([Validators.maxLength(55), Validators.required])],
      pwdnew: ['', Validators.compose([Validators.maxLength(55), Validators.required])],
      pwdconf: ['', Validators.compose([Validators.maxLength(55), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePasswordPage');
    this.getUserInfos();
  }

  logout() {
    StorageUtils.removeToken();
    StorageUtils.removeAccount();
    this.navCtrl.setRoot(LoginPage);
  }

   updatePassword(){
    //this.connectivityService.checkNetwork();
    if(!this.myFormulaire.valid){
      console.log("Remplissez le champs!");
      //this.showToast("Le champ est obligatoire")
    }
    else{ 
      //this.connectivityService.checkNetwork();
      //console.log(this.email);
      var json = this.myFormulaire.value;
      if(json.pwdnew != json.pwdconf){
      	console.log("Les mots de passe ne sont pas identiques");
      this.showToast("Les mots de passe ne sont pas identiques")
      }
      else{
      	let loader = this.loading.create({
	     content: 'Chargement en cours...',
	    });
	    
	    let user={email: this.email, password: json.pwdnew, oldpassword: json.pwdnow, id: 1}
	    loader.present().then(() => {
	    this.userService.updatePassword(user).subscribe(
	        data => {
	        	console.log(data);
		        if(data.corps == 1){
		          this.logout();
              this.showToast("Modification effectuée avec succés Veuillez vous reconnecter svp") 
		        }
		        else{
		        	var subTitle ="Creation de compte";
		        	console.log(data);
	          		//this.presentToast(data.message);
	          		this.showToast("Le mot de passe est incorrect");
		        }
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
  }

  getUserInfos(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      	this.userService.getInfoUser().subscribe(
	        data => {
	        this.utilisateur = data.user; 
	        console.log(this.utilisateur);
	            if(data.status == 0){
	              console.log(this.utilisateur);
	              this.email = this.utilisateur.email;
	              console.log(this.utilisateur);

	            }
	            else{
	              let titre ="Pas d'utilisateu  a afficher";
	              console.log(this.utilisateur+' 1');
	              
	            }
	        },
	        err => {
	            console.log(err);
	            loader.dismiss();
	            let titre ="Une erreur est survenue reessayer plus tard ";
	            //this.presentPromptOk(titre);
	        },
	        () => {loader.dismiss()}
      	);
    })

	}
	
	showToast(titre){
    this.toast.show(titre, '5000', 'center').subscribe(
      toast => {
        //console.log(toast);
      }
    );
  }


}
