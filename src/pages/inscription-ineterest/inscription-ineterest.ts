import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageUtils } from '../../Utils/storage.utils';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HomePage } from '../home/home';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';

/**
 * Generated class for the InscriptionIneterestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscription-ineterest',
  templateUrl: 'inscription-ineterest.html',
})
export class InscriptionIneterestPage {
	interests: any;
  centreInteret: any;
	centre: any;
	tabcentre: any;
	valeurInt: String ="";
	myFormulaire: FormGroup;
  surveyForm: FormGroup;
  interet: any;
  value: any;
  bg: any;
  color: any;
  coteDos:boolean = false;
  urlFace: any;
  urlDos: any;
  groups: any;
  categorieInteret: any;
  idTypeCat: any;
  inte: any;
  user: any;
  nointe: any;
  messages: any;
  location: any;

  constructor(public connectivityService:ConnectvityServiceProvider, public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private alertCtrl: AlertController, public loading: LoadingController, public userService:UserServiceProvider, public eventService:EventServiceProvider, private toastCtrl: ToastController) {

    if(navParams.get("user") !== "undefined")
    {
      this.user = navParams.get("user");
      console.log(this.user);
    }

  	this.centre = {};
    this.nointe = false;
    this.interet={image:''};
    //this.connectivityService.checkNetwork();
    this.getCentreInteret();
    this.tabcentre=[];
  	console.log(this.centreInteret);
    this.value = 0;
    this.inte =[];
    


    this.myFormulaire = this.formBuilder.group({
      idInterests: formBuilder.array([])
    })

    if(this.centreInteret){
      for (var i = 0; i < this.centreInteret.length; i++) {
        // get multiple
        let centre = formBuilder.group({
          centr_id: [this.centreInteret[i].id, Validators.required]
        });
      }
    }

    
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionIneterestPage');
    //this.getCategoriesInteret();
    //this.getInterest();

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

  getCentreInteret(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.userService.getInterest().subscribe(
        data => {
            this.centreInteret = data.interests; 
            this.location = data.location;
            //this.centreInteret = data;
            console.log(this.centreInteret);
                if(this.centreInteret == null){
                  let titre ="Pas de centreInteret  a afficher";
                  console.log(this.centreInteret+' f1');
                }
                else{
                  console.log(this.centreInteret);
                  var tof = "";
                  var tof1 = "";
                  for (var i=0; i<this.centreInteret.length; i++)
                  {
                    if(this.centreInteret[i].photoInterest == null){
                      tof = "assets/images/ICONS_Photo2.png";
                    }
                    else{
                      tof = this.centreInteret[i].photoInterest;
                      console.log(this.centreInteret[i].photoInterest);
                    }

                    if(this.centreInteret[i].photoInterest2 == null){
                      tof1 = "assets/images/ICONS_Photo1.png";
                    }
                    else{
                      tof1 = this.centreInteret[i].photoInterest2;
                      console.log(this.centreInteret[i].photoInterest2);
                    }

                    if(i >=0 && i<=8){
                      
                      this.centreInteret[i] ={
                        idInterest: this.centreInteret[i].idInterest,
                        nomInterest: this.centreInteret[i].nomInterest,
                        //photoInterest: tof,
                        //photoInterest2: tof1,
                        photoInterest: this.centreInteret[i].photoInterest2,
                        photoInterest2: this.centreInteret[i].photoInterest,
                        val: false,
                        idcat: 1
                      }; 
                    }

                    if(i >=9 && i<=17){
                      
                      this.centreInteret[i] ={
                        idInterest: this.centreInteret[i].idInterest,
                        nomInterest: this.centreInteret[i].nomInterest,
                        //photoInterest: tof,
                        //photoInterest2: tof1,
                        photoInterest: this.centreInteret[i].photoInterest2,
                        photoInterest2: this.centreInteret[i].photoInterest,
                        val: false,
                        idcat: 2
                      }; 
                    }

                    if(i >=18 && i<=27){
                      
                      this.centreInteret[i] ={
                        idInterest: this.centreInteret[i].idInterest,
                        nomInterest: this.centreInteret[i].nomInterest,
                        //photoInterest: tof,
                        //photoInterest2: tof1,
                        photoInterest: this.centreInteret[i].photoInterest2,
                        photoInterest2: this.centreInteret[i].photoInterest,
                        val: false,
                        idcat: 3
                      }; 
                    }
                             
                  }

                   console.log(this.centreInteret);
                   console.log(this.location);

                   this.getCategoriesInteret();

                  
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

  

  addInterestUser(){
    let loader = this.loading.create({
      content: 'Chargement en cours...',
    });
    loader.present().then(() => {
    let interests = [];

    var json = this.myFormulaire.value;
    var userInterest={};
    console.log(json.idInterests.length);
    for(var i = 0;i < json.idInterests.length; i++){
      //userInterest={idUsers: idUser, idcentre: json.idInterests[i]};
      interests.push(json.idInterests[i]);
      
    }

    userInterest={idUsers: this.user.idUser, interests};
    console.log(userInterest);
    
    this.userService.addInterestUser(userInterest,this.user.idUser).subscribe(
        data => {
          console.log(data);
          if(data.status == 0){
            this.goToHomePage();
          }
          else{
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

  goToHomePage(){
    this.navCtrl.push(HomePage, {
      'home': 'home'
    });
  }

  getValue(value,key){
  	if(this.centre.checked){
  		console.log('tabcentre');
  	}
  	
  	
  		if(value){
	      this.tabcentre.push(parseInt(key));
	      this.valeurInt = this.valeurInt + ''+key+',';
	    }
	  	
    	console.log(this.tabcentre);
    	console.log(this.valeurInt);
  	
  }

  goToIneterest(){
    var idUser="1";
  	var json = this.myFormulaire.value;
    console.log(json.idInterests[0]);
    var userInterest={};
    console.log(json.idInterests.length);
    for(var i = 0;i < json.idInterests.length; i++){
      userInterest={iduser: idUser, idcentre: json.idInterests[i]};
      console.log(userInterest);
    }
    this.goToHomePage();

  }


  onChangeee(id, isChecked, index) {
    const answers = <FormArray>this.myFormulaire.controls.idInterests
    
    if(isChecked) {
      answers.push(new FormControl(id))
      console.log(this.myFormulaire.value);
    } else {
      let idx = answers.controls.findIndex(x => x.value == id);
      answers.removeAt(idx)
      console.log(this.myFormulaire.value);
    }
  }

  

  affichePhoto(photo){
    this.interet.image=photo;
  }

  tournerPhotoVersFace(urlFace){
    this.affichePhoto(urlFace);
  }
  tournerPhotoVersDos(urlDos){
    this.affichePhoto(urlDos);
  }

  photoClicked(interet){
    const answers = <FormArray>this.myFormulaire.controls.idInterests
    console.log(interet);
    this.color="#c81437";
    if(!interet.val){
         this.tournerPhotoVersFace(interet.photoInterest);
         this.urlFace = interet.photoInterest;
         console.log(interet.photoInterest);
         answers.push(new FormControl(interet.idInterest));
         console.log(this.myFormulaire.value);
    }
    else{

        this.tournerPhotoVersDos(interet.photoInterest2);
        this.urlFace = interet.photoInterest2;
        console.log(interet.photoInterest2);
        let idx = answers.controls.findIndex(x => x.value == interet.idInterest);
        answers.removeAt(idx)
        console.log(this.myFormulaire.value);
    }
    interet.val = !interet.val;
    console.log(interet.val);
  }


  tofClicked(interet){
    const answers = <FormArray>this.myFormulaire.controls.idInterests
    console.log(interet);
    this.inte = [];
    this.idTypeCat = interet.id;
    console.log(this.idTypeCat);
    var tof = "";
    var tof1 = "assets/images/ICONS_Photo1.png";
    if(this.centreInteret){
      for (var i=0; i<this.centreInteret.length; i++)
      {
        if(this.centreInteret[i].photoInterest == null){
          tof = "assets/images/ICONS_Photo2.png";
        }
        else{
          tof = this.centreInteret[i].photoInterest;
        }

        if(this.centreInteret[i].photoInterest == null){
          tof1 = "assets/images/ICONS_Photo2.png";
        }
        else{
          tof1 = this.centreInteret[i].photoInterest2;
        }
        if(this.idTypeCat == this.centreInteret[i].idcat)
        {
          this.centreInteret[i] ={
            idInterest: this.centreInteret[i].idInterest,
            nomInterest: this.centreInteret[i].nomInterest,
            photoInterest: tof,
            photoInterest2: tof1,
            val: false,
            idcat: this.centreInteret[i].idcat

          };
          console.log(this.interests[i].idcat+"  "+this.idTypeCat+" verif");

          this.inte.push({
            idInterest: this.centreInteret[i].idInterest,
            nomInterest: this.centreInteret[i].nomInterest,
            photoInterest: tof,
            photoInterest2: tof1,
            val: false,
            idcat: this.centreInteret[i].idcat
          });
        }
      }

    }
    
    console.log(this.inte);
    if(this.inte.length == 0){
      this.nointe = true;
      this.messages = "Pas de centre d'interets pour cette categorie";
      console.log("Pas de centre d'interets pour cette categorie");
    }
    else{
      this.nointe = false;
    }
    this.color="#c81437";
    if(!interet.val){
         this.tournerPhotoVersFace(interet.image);
         this.urlFace = interet.image;
         console.log(interet.image);
         console.log(interet.id);
    }
    else{

        this.tournerPhotoVersDos(interet.photo);
        this.urlFace = interet.photo;
        console.log(interet.photo);
        let idx = answers.controls.findIndex(x => x.value == interet.idInterest);
        answers.removeAt(idx)
        console.log(interet.id);
    }
    interet.val = !interet.val;
    console.log(interet.val);
  }

  getCategoriesInteret(){
    //this.categorieInteret = this.eventService.getCategorieInteret();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getCategorieInteret().subscribe(
        data => {
            this.categorieInteret = data; 
            for (var i=0; i<this.categorieInteret.length; i++){
            this.categorieInteret[i] ={
              id: this.categorieInteret[i].id,
              nomInteret: this.categorieInteret[i].nomInteret,
              image: this.categorieInteret[i].image,
              photo: this.categorieInteret[i].photo,
              val: false
            };
            this.idTypeCat = this.categorieInteret[0].id;
          }
          console.log(this.idTypeCat);
            console.log(this.categorieInteret);
                if(this.categorieInteret == 0){
                  let titre ="Pas de recommendations  a afficher";
                  console.log(this.categorieInteret+' 1');
                }
                else{
                  console.log(this.categorieInteret);
                  //this.interests = this.eventService.getCentreInteret();
                  this.interests  = this.centreInteret;
                  console.log(this.centreInteret);
                  console.log(this.interests);
                  console.log(this.idTypeCat);

                  var tof = "";
                  var tof1 = "";
                  if(this.interests){
                    for (var i=0; i<this.interests.length; i++)
                    {
                      if(this.centreInteret[i].photoInterest == null){
                        tof = "assets/images/ICONS_Photo2.png";
                      }
                      else{
                        tof = this.centreInteret[i].photoInterest;
                      }

                      if(this.centreInteret[i].photoInterest2 == null){
                        tof = "assets/images/ICONS_Photo1.png";
                      }
                      else{
                        tof = this.centreInteret[i].photoInterest2;
                      }
                        if(this.idTypeCat == this.interests[i].idcat)
                        {
                          this.interests[i] ={
                            /*id: this.interests[i].id,
                            nomInteret: this.interests[i].nomInteret,
                            image: this.interests[i].image,
                            photo: this.interests[i].photo,
                            val: false,
                            idcat: this.interests[i].idcat*/

                            idInterest: this.centreInteret[i].idInterest,
                            nomInterest: this.centreInteret[i].nomInterest,
                            //photoInterest: tof,
                            //photoInterest2: tof1,
                            photoInterest: this.centreInteret[i].photoInterest2,
                            photoInterest2: this.centreInteret[i].photoInterest,
                            val: false,
                            idcat: this.centreInteret[i].idcat
                          };
                          console.log(this.interests[i].idcat+"  "+this.idTypeCat+" verif");

                          this.inte.push({
                            /*id: this.interests[i].id,
                            nomInteret: this.interests[i].nomInteret,
                            image: this.interests[i].image,
                            photo: this.interests[i].photo,
                            val: false,
                            idcat: this.interests[i].idcat*/

                            idInterest: this.centreInteret[i].idInterest,
                            nomInterest: this.centreInteret[i].nomInterest,
                            //photoInterest: tof,
                            //photoInterest2: tof1,
                            photoInterest: this.centreInteret[i].photoInterest2,
                            photoInterest2: this.centreInteret[i].photoInterest,
                            val: false,
                            idcat: this.centreInteret[i].idcat
                          });
                        }
                    }
                  }
                  
                  console.log(this.inte);
                  
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

}
