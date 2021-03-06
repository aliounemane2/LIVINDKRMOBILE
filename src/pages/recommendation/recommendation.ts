import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ViewController } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
//import { LocationsProvider } from '../../providers/locations/locations';
import { InstitutionPage } from '../institution/institution';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';
/**
 * Generated class for the RecommendationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recommendation',
  templateUrl: 'recommendation.html',
})
export class RecommendationPage {
  evenements: any;
  typeEvents:  any ; 
  location: any;
  typeEvent: any;
  institution: any;
  value: any;
  message: any;
  url: any;

  constructor(public connectivityService:ConnectvityServiceProvider, public navCtrl: NavController, public navParams: NavParams ,private eventService:EventServiceProvider, public loading: LoadingController,public viewCtrl: ViewController) {
    this.value = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendationPage');
    //this.connectivityService.checkNetwork();
    this.getRecommendation();
  }

  goToDetailsEvent(evenement){
  	this.navCtrl.push(InstitutionPage, {
   		'ins': evenement,
      'url': this.url
    });
  }


  getRecommendation(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getRecommendation().subscribe(
        data => {
            this.institution = data.sous_category; 
            console.log(data);
            console.log(this.institution);
                if(data.status == -1){
                  this.value = true;
                  let titre ="Aucune Institution ne correspond à vos centres d'interets";
                  this.message = titre;
                  console.log(this.message );

                }
                else{
                  this.url = data.urls;
                  console.log(this.institution);
                  
                }
            },
            err => {
                this.value = true;
                console.log(err);
                loader.dismiss();
                let titre ="Fonctionnalité non disponible pour le moment";
                this.message = titre;
                console.log(this.message );
                //this.presentPromptOk(titre);
            },
            () => {loader.dismiss()}
      );
    })
  }

}