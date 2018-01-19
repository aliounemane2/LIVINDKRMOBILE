import { DetailsEventPage } from '../details-event/details-event';
import { Component, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { LocationsProvider } from '../../providers/locations/locations';
import * as _ from 'lodash';
import { InstitutionPage } from '../institution/institution';
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

  constructor(public navCtrl: NavController, public navParams: NavParams ,private alertCtrl: AlertController,private eventService:EventServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, public locations: LocationsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendationPage');
    this.getEvenements();
    this.getRecommendation();
  }

  goToDetailsEvent(evenement){
  	this.navCtrl.push(InstitutionPage, {
   		'ins': evenement
    });
  }

  getEvenements(){
    //this.evenements = this.eventService.getEvenements();
    //console.log(this.evenements)
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getRecommendations().subscribe(
        data => {
            this.evenements = data; 
            console.log(this.evenements);
                if(this.evenements == 0){
                  let titre ="Pas de evenements  a afficher";
                  console.log(this.evenements+' 1');

                }
                else{
                  console.log(this.evenements);
                  
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

  getRecommendation(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getRecommendation(10).subscribe(
        data => {
            this.institution = data.sous_category; 
            console.log(this.institution);
                if(this.institution == null){
                  let titre ="Pas de evenements  a afficher";
                  console.log(this.institution+' 1');

                }
                else{
                  console.log(this.institution);
                  
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