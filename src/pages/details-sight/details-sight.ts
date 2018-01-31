import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CarteMapPage } from '../carte-map/carte-map';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';


/**
 * Generated class for the DetailsSightPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-sight',
  templateUrl: 'details-sight.html',
})
export class DetailsSightPage {
	institution: any;
  titre: any;
  vignette: any;
  messagephoto: any;
  valuePhoto: any;
  url: any;

  constructor(public connectivityService:ConnectvityServiceProvider, public navCtrl: NavController, public navParams: NavParams,private eventService:EventServiceProvider, public loading: LoadingController) {
	  	if(navParams.get("data") !== "undefined")
	    {

	      this.institution = navParams.get("data");
        this.titre = navParams.get("titre");
        this.url = navParams.get("url");
	      console.log(this.institution);
        console.log(this.titre);
        console.log(this.url);
	    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsSightPage');
    this.connectivityService.checkNetwork();
    this.getVignetteByInstitution(this.institution);
  }

  goToCarteMap(evenement){
    this.navCtrl.push(CarteMapPage, {
      'accueil': 'event',
      'data': evenement,
      'titre':evenement.nom
    });
  }

  getVignetteByInstitution(ins){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getVignetteByInstitution(ins.idInstitution).subscribe(
        data => {
            this.vignette = data.category; 
            console.log(this.vignette);
                if(!this.vignette){
                  let titre ="Pas de categories  a afficher";
                  console.log(titre);
                  this.messagephoto = "Pas de photo à afficher ";
                  this.valuePhoto = true;
                }
                else{
                  console.log(this.vignette);

                  
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
