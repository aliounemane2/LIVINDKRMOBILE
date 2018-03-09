import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ModalController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { User} from '../../Classes/user';
import { StorageUtils} from '../../Utils/storage.utils';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { NotationModalPage } from '../notation-modal/notation-modal';
//import { Transfer, TransferObject } from '@ionic-native/transfer';
import { Toast } from '@ionic-native/toast';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';
//private toast : Toast,

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
  use: User
  utilisateur: any;
  options: any ;
  server: any;
  vpci: any;
  url: any;
  photoProfil:any;

  constructor(public connectivityService:ConnectvityServiceProvider, private toast : Toast, public navCtrl: NavController, public navParams: NavParams,
   public userService:UserServiceProvider, public loading: LoadingController,
   public formBuilder: FormBuilder,private eventService:EventServiceProvider, 
   public camera:Camera, private transfer: FileTransfer, public modalCtrl: ModalController) {
   	this.myFormulaire = formBuilder.group({
      nom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [''],
      prenom: ['', Validators.compose([Validators.maxLength(30),Validators.required])],
      username: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      telephone: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
      //password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])]
      //indicatif: ['']
    });
    this.valuePhoto = false;
    this.vpci = false;
    this.valueAvis = false;
    this.pprofil='avis';
    this.level = 6;
    this.moyenne = 0;
    this.use = StorageUtils.getAccount();
    console.log(this.use);
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
    //this.connectivityService.checkNetwork();
    //this.getInfosUser();
    this.getUserInfos();
    this.getAvisUser();
    this.getVignetteIns();
  }

  getUserInfos(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getInfoUser().subscribe(
        data => {
            this.utilisateur = data.user; 
            this.url = data.urls;
            console.log(this.utilisateur);
                if(data.status == 0){
                  console.log(this.utilisateur);
                  this.nom = this.utilisateur.nom;
                  this.username = this.utilisateur.pseudo;
                  //this.numTelephone = this.utilisateur.telephone;
                  this.prenom = this.utilisateur.prenom;
                  this.email = this.utilisateur.email;
                  this.numTelephone = this.utilisateur.telephone.substring(1);
                  console.log(this.utilisateur);
                  this.myFormulaire.controls['prenom'].setValue(this.prenom);
                  this.myFormulaire.controls['nom'].setValue(this.nom);
                  this.myFormulaire.controls['username'].setValue(this.username);
                  this.myFormulaire.controls['email'].setValue(this.email);
                  this.myFormulaire.controls['telephone'].setValue(this.numTelephone);

                }
                else{
                  let titre ="Pas d'utilisateu  a afficher";
                  console.log(this.vignette+' 1');
                  
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
        let user = {nom: json.nom, prenom: json.prenom, telephone: '+'+json.telephone,password: json.password, pseudo:json.username}
        console.log(user);

		    this.userService.editUser(user).subscribe(
		      data => {
		         if(data.status == 0){
              //this.showToast("Informations modifiées avec succés");
              console.log("Informations modifiées avec succés");
             }
             else{
              console.log(data);
              //this.showToast(data.message);
             }
		        
		      },
		      err => {
		          console.log(err);
		          loader.dismiss();
            		//this.showToast("Une erreur s'est produite Reessayer plus tard");
		      },
		      () => {loader.dismiss()}

			);
			  
		 });
	  }
  }

  getAvisUser(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getAvisByUser().subscribe(
        data => {
            this.avis = data.note; 
            console.log(this.avis);
                if(data.status == 0){

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
                else{

                  let titre ="Pas de avis  a afficher";
                  this.messageAvis = "Pas d'avis à afficher ";
                  this.valueAvis = true;
                  console.log(titre);
                  
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

  getPicture(){
    this.options= {
        allowEdit: true,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG
    };
    this.camera.getPicture(this.options).then((imageData) => {
      this.vpci = true;
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
      this.photoProfil = this.resize(this.base64Image, 480, 480);
      this.upload();
      
     }, (err) => {
      //console.log(err);
      this.showToast("Une erreur est survenue réessayer plus tard");
    });
  }

  resize(base64Img, width, height) {
    var img = new Image();
    img.src = base64Img;
    var canvas = document.createElement('canvas'),ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg");
  }

  uploadProfilPhoto(){
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
       fileKey: 'file',
       fileName: this.username+'.jpg',
       headers: {}
    }

    let loader = this.loading.create({
      content: 'Chargement en cours...',
    });

     loader.present().then(() => {

     });
  }

  upload(){
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
       fileKey: 'file',
       fileName: this.username+'.jpg',
       headers: {}
    }

    let loader = this.loading.create({
      content: 'Chargement en cours...',
    });
    loader.present().then(() => {
      fileTransfer.upload(this.photoProfil, this.userService.url+'/user/updatephoto?pseudo='+this.username+'&type=0', options1)
       .then((data) => {
          loader.dismiss();
          alert(data);
          console.log(data);
          }, (err) => {
           // error
           loader.dismiss();
           alert("error"+JSON.stringify(err));
           //console.log("error"+JSON.stringify(err));
          }
        );
    });
  }

  openModal(data){
    let texte = 'voulez-vous Modifier cet avis ?';
      let obj = {ins: data, ret: texte, parent:'update'};
      this.openMod(obj);
  }

  openMod(data) {
    let myModal = this.modalCtrl.create(NotationModalPage, data,
    {
      cssClass: 'settings-modal'
    });
    myModal.present();
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'center').subscribe(
      toast => {
        //console.log(toast);
      }
    );
  }

}
