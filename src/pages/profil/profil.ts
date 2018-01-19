import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventServiceProvider } from '../../providers/event-service/event-service';

/**
 * Generated class for the ProfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
	id: any;
	nom:any;
	username: any; 
	numTelephone: any;
	email: any;
	password: any;
	prenom: any;
	imageProfil: any;
	myFormulaire: FormGroup;
	formBuilde: FormBuilder;
	base64Image:any;
	link: any;
	users: any;
	pprofil: any;
	avis: any;
	vignette: any;
  note: any;
  level: any;
  allNote: any;
  moyenne: any;
  valuePhoto: any;
  valueAvis: any;
  messagephoto: any;
  messageAvis: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public userService:UserServiceProvider, public loading: LoadingController,public formBuilder: FormBuilder,private eventService:EventServiceProvider) {
   	this.myFormulaire = formBuilder.group({
      nom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [''],
      prenom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'),Validators.required])],
      username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
      telephone: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      indicatif: ['']
    });
    this.valuePhoto = false;
    this.valueAvis = false;
    this.pprofil='avis';
    this.level = 6;
    this.moyenne = 0;
    this.note =
    [
      
    ];
    for(var i =0; i< 10;i++){
      this.note.push({"id":i,"price":"$"});
    }
    console.log(this.note);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
    this.getInfosUser();
    //this.getAvisIns();
    this.getAvisUser();
    this.getVignetteIns();
  }

  getInfosUser(){
	  this.users = this.userService.getInfoUser();
	  this.nom = this.users.nom;
	  this.username = this.users.username;
	  this.numTelephone = this.users.telephone;
	  this.prenom = this.users.prenom;
	  this.email = this.users.email;
	  console.log(this.users);
	  this.myFormulaire.controls['prenom'].setValue(this.prenom);
      this.myFormulaire.controls['nom'].setValue(this.nom);
      this.myFormulaire.controls['username'].setValue(this.username);
      this.myFormulaire.controls['email'].setValue(this.email);
      this.myFormulaire.controls['telephone'].setValue(this.numTelephone);
  	/*let loader = this.loading.create({
    content: 'Chargement en cours...',
  	});

  	loader.present().then(() => {
	    this.userService.getInfoUser().subscribe(
		      data => {
		          this.users = data.user; 
		          this.nom = data.user.nom;
		          this.username = data.user.username;
		          this.numTelephone = data.user.numero_telephone;
		          this.imageProfil = data.user.image;
		          this.email = data.user.email;
		        
		          this.prenom = data.user.prenom
		          this.password = data.user.password;
		          //console.log(this.numTelephone);
		          this.myFormulaire.controls['prenom'].setValue(this.prenom);
		          this.myFormulaire.controls['nom'].setValue(this.nom);
		          this.myFormulaire.controls['username'].setValue(this.username);
		          this.myFormulaire.controls['email'].setValue(this.email);
		          this.myFormulaire.controls['telephone'].setValue(this.numTelephone);
		      },
		      err => {
		          //console.log(err);
		          loader.dismiss();
		      },
		      () => {loader.dismiss()}

		);
		  
	});*/
  }

  editUser(){
  	if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
      //this.showToast("Remplissez tous les champs!");
    }
    else
    {
      //this.connectivityService.checkNetwork();
    	let loader = this.loading.create({
	    content: 'Chargement en cours...',
	  	});

	  	loader.present().then(() => {
	  		var json = this.myFormulaire.value;
        let user = {nom: json.nom, prenom: json.prenom, telephone: json.indicatif+json.telephone,password: json.password}

		    this.userService.editUser(user).subscribe(
		      data => {
		         
		        console.log(data.message);
            	//this.showToast(data.message);
		      },
		      err => {
		          //console.log(err);
		          loader.dismiss();
            		//this.showToast("Une erreur s'est produite Reessayer plus tard");
		      },
		      () => {loader.dismiss()}

			);
			  
		 });
	  }
  }

  getAvisIns(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getAvisUser().subscribe(
        data => {
            this.avis = data; 
            console.log(this.avis);
                if(this.avis == 0){
                  let titre ="Pas de avis  a afficher";
                  console.log(this.avis+' 1');

                }
                else{
                  console.log(this.avis);
                  
                }
            },
            err => {
                //console.log(err);
                loader.dismiss();
                let titre ="Une erreur est survenue reessayer plus tard ";
                //this.presentPromptOk(titre);
            },
            () => {loader.dismiss()}
      );
    })
  }

  getAvisUser(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getAvisByUser(4).subscribe(
        data => {
            this.avis = data.note; 
            console.log(this.avis);
                if(this.avis.length < 1){
                  let titre ="Pas de avis  a afficher";
                  this.messageAvis = "Pas d'avis à afficher ";
                  this.valueAvis = true;
                  console.log(titre);

                }
                else{
                  console.log(this.avis);
                  let lnote;
                  let nbAvis = 0;
                  console.log(this.avis);
                  this.allNote = 0;
                  for(var i = 0; i < this.avis.length; i++ )
                  {
                    lnote = this.avis[i].note;
                    nbAvis = nbAvis + 1;
                    console.log(lnote);
                    this.allNote = this.allNote + lnote;
                  }
                  this.moyenne = this.allNote/nbAvis;
                  console.log(this.moyenne);
                  
                }
            },
            err => {
                //console.log(err);
                loader.dismiss();
                let titre ="Une erreur est survenue reessayer plus tard ";
                //this.presentPromptOk(titre);
            },
            () => {loader.dismiss()}
      );
    })
  }

  getVignetteIns(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getVignetteIns().subscribe(
        data => {
            this.vignette = data; 
            console.log(this.vignette);
                if(this.vignette == 0){
                  let titre ="Pas de vignette  a afficher";
                  console.log(this.vignette+' 1');

                }
                else{
                  console.log(this.vignette);
                  
                }
            },
            err => {
                //console.log(err);
                loader.dismiss();
                let titre ="Une erreur est survenue reessayer plus tard ";
                //this.presentPromptOk(titre);
            },
            () => {loader.dismiss()}
      );
    })
  }

}
