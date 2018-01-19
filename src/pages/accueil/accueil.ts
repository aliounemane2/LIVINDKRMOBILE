import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events, ModalController } from 'ionic-angular';
import { CarteMapPage } from '../carte-map/carte-map';
import { InstitutionPage } from '../institution/institution';
import { EvenementPage } from '../evenement/evenement';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { ListeInstitutionPage } from '../liste-institution/liste-institution';
import { PublicitePage } from '../publicite/publicite';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the AccueilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})
export class AccueilPage {
  categories: any;
  inst: any;
  recommendations: any;
  sousCategories: any;
  titre1: any;
  sousCat: any;
  category: any;
  sCat: any;
  scat1: any;
  publicite: any;
  isPub: any;
  url: any;
  message: any;
  value: any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,private alertCtrl: AlertController,private eventService:EventServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, public locationTracker: LocationTrackerProvider, public modalCtrl: ModalController, public storage: Storage){
    //this.locationTracker.checkLocation();
    this.publicite ={id: "1", image:"assets/images/pub.jpg"};
    this.value = false;
    this.storage.get('name').then((val) => {
      console.log('Your name is', val);
      this.isPub = val;
      console.log(this.isPub);
      if(this.isPub == '0'){
        this.openMod(this.publicite);
      }
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccueilPage');
    this.getCategory();
  }

  goToEvenements(){
    this.navCtrl.push(EvenementPage, {
      'ins': 'ins'
    });
  }

  openMod(data) {
    let myModal = this.modalCtrl.create(PublicitePage, data,
    {
      cssClass: 'settings-modal-pub'
    });
    myModal.present();
  }

  goToListeinstitution(categorie){
    if(categorie.nom == 'Evénements' || categorie.nom == 'Evenements')
    {
      this.navCtrl.push(EvenementPage, {
        'ins': 'ins'
      });
    }
    else{
      this.sousCat = [];
      console.log(categorie.nom);
      this.getSousCategoryByCategory(categorie);
      /*console.log(this.sCat);
      console.log(this.scat1);
      for(var i =0 ; i < this.sousCategories.length; i++)
      {
        if(this.sousCategories[i].categorie == categorie.nom)
        {
          this.sousCat.push(this.sousCategories[i]);

        }
      }
      if(this.sousCat == 0){
        this.titre1 ="Non Sous categorie";
      }
      else{
        this.titre1 ="Sous categorie";
      }
      if(this.sousCat == 0 && categorie.nom == 'Découverte'){
        this.titre1 ="Découvertee";
      }

      if(this.sousCat == 0 && categorie.nom == 'Découverte'){
        this.titre1 ="Découverte";
      }

      if(this.sousCat == 0 && categorie.nom == 'Restaurants'){
        this.titre1 ="Restaurants";
      }

      if(this.sousCat == 0 && categorie.nom == 'Prestataires'){
        this.titre1 ="Prestataires";
      }
      this.navCtrl.push(ListeInstitutionPage, {
        'data': categorie,
        'titre': categorie.nom,
        'titre1': this.titre1,
        'souscat':this.sousCat,
        'scat': categorie.id,
        'url': this.url
      });
      console.log(this.categories);
      console.log(this.sousCat);*/
    }
    

    
    
  }

  getSousCategoryByCategory(categorie){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getSousCategoryByCategory(categorie.idCategory).subscribe(
        data => {
            this.sCat = data.sous_category; 
            this.scat1 = data.sous_category;

            //this.sCat = data; 
            //this.scat1 = data;
            console.log(this.sCat);
            console.log(this.scat1);  

            if(this.sCat == null){
              this.titre1 ="Non Sous categorie";
            }
            if(this.sCat != null && categorie.nom =="Prestataires"){
              this.titre1 ="Prestataires";
            }
            if(this.sCat != null && categorie.nom != "Prestataires"){
              this.titre1 ="Sous categorie";
            }
            if(this.sCat == null && categorie.nom == 'Découverte'){
              this.titre1 ="Découverte";
            }

            if(this.sCat == null && categorie.nom == 'Restaurants'){
              this.titre1 ="Restaurants";
            }

            /*if(this.sCat == null && categorie.nom == 'Prestataires'){
              this.titre1 ="Prestataires";
            }*/
            this.navCtrl.push(ListeInstitutionPage, {
              'data': categorie,
              'titre': categorie.nom,
              'titre1': this.titre1,
              'souscat':this.sCat,
              'scat': categorie.id
            });
            console.log(this.titre1);
            console.log(categorie.nom);
            
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


  getCategory(){
    //this.categories = this.eventService.getCategories();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getCategory()
      .subscribe(
        data => {
            this.category = data.category; 
            this.url = data.urls;
            console.log(this.category);
                if(this.category == 0){
                  let titre ="Pas de category  a afficher";
                  this.message ="Pas de catégorie  à afficher";
                  this.value = true;
                  console.log(this.category+' f1');
                }
                else{
                  console.log(this.category);
                  
                }
            },
            err => {
                loader.dismiss();
                console.log(err);
                
                this.message ="Une erreur est survenue reessayer plus tard ";
                this.value = true;
                let titre ="Une erreur est survenue reessayer plus tard ";
                //this.presentPromptOk(titre);
                //this.presentPromptOk(titre);


            },
            () => {loader.dismiss()}
      );
    })
  }

  

}
