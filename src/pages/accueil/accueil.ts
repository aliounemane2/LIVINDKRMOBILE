import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events, ModalController } from 'ionic-angular';
import { CarteMapPage } from '../carte-map/carte-map';
import { InstitutionPage } from '../institution/institution';
import { EvenementPage } from '../evenement/evenement';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';
import { ListeInstitutionPage } from '../liste-institution/liste-institution';
import { PublicitePage } from '../publicite/publicite';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
//private toast : Toast


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
  urlsc: any;
  data:any;

  constructor(public connectivityService:ConnectvityServiceProvider, private toast : Toast, public navCtrl: NavController, public navParams: NavParams ,private alertCtrl: AlertController,private eventService:EventServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, public locationTracker: LocationTrackerProvider, public modalCtrl: ModalController, public storage: Storage){
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
    //this.connectivityService.checkNetwork();
    this.getCategory();
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'center').subscribe(
      toast => {
        //console.log(toast);
      }
    );
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
<<<<<<< HEAD
    }
    

    
    
=======
      /*this.navCtrl.push(ListeInstitutionPage, {
        'data': categorie,
        'titre': categorie.nom,
        'titre1': this.titre1,
        'souscat':this.sCat,
        'scat': categorie.id,
        'urlsc': this.urlsc
      });*/
    } 
>>>>>>> 41d8e9b61ca5a5632bc61eb8c767a88c45cb0f9d
  }

  getSousCategoryByCategory(categorie){
     //if(this.connectivityService.isOnline()){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
     
        this.eventService.getSousCategoryByCategory(categorie.idCategory).subscribe(
        data => {
            this.sCat = data.sous_category; 
            this.scat1 = data.sous_category;
            this.urlsc = data.urls;

            //this.sCat = data; 
            //this.scat1 = data;
            console.log(this.sCat);
            console.log(this.scat1); 
            console.log(this.urlsc); 

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
            this.navCtrl.push(ListeInstitutionPage, {
              'data': categorie,
              'titre': categorie.nom,
              'titre1': this.titre1,
              'souscat':this.sCat,
              'urlsc': this.urlsc
            });
            console.log(this.titre1);
            console.log(categorie.nom);
            console.log(this.sCat);
            console.log(this.urlsc);
            console.log(categorie);
            
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

    /*}
      else{
        this.data = this.eventService.getSousCategoryByCategory(categorie.idCategory);
        console.log(this.data);

      }*/

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
                if(this.category == null){
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
                
                //this.message ="Une erreur est survenue reessayer plus tard ";
                //this.value = true;
                //let titre ="Une erreur est survenue reessayer plus tard ";
                //this.showToast();
                //this.presentPromptOk(titre);
                //this.presentPromptOk(titre);


            },
            () => {loader.dismiss()}
      );
    })
  }

  

}
