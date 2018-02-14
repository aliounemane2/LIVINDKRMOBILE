import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';

/**
 * Generated class for the DetailsDecouvertePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-decouverte',
  templateUrl: 'details-decouverte.html',
})
export class DetailsDecouvertePage {
	decouverte: any;
	titre: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService:EventServiceProvider) {
  	if(navParams.get("data") !== "undefined" )
    {
      this.decouverte = navParams.get("data");
      this.titre = navParams.get("titre");
      console.log(this.decouverte);
      console.log(this.titre);
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsDecouvertePage');
    this.updtaeNbLecteur(this.decouverte)
  }

  updtaeNbLecteur(article){   
    this.eventService.updateNblecteur(article).subscribe(
        data => {
          console.log(data);
          if(data.article){
            //this.showToast("Avis modifiée avec succés");
            //this.presentToast(data.message);
            console.log(data);
            
          }
          else{
            //this.showToast(data.message);
            console.log(data);

          }

        },
        err => {
            console.log(err);
            //this.showToast("UUne erreur est survenue réessayer plus tard" );
        }
    );
  }

}
