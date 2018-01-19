import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarteMapPage } from '../carte-map/carte-map';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  	if(navParams.get("data") !== "undefined")
	    {

	      this.institution = navParams.get("data");
	      this.titre = navParams.get("titre");
	      console.log(this.institution);
	      console.log(this.titre);
	    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsSightPage');
  }

  goToCarteMap(evenement){
    this.navCtrl.push(CarteMapPage, {
      'accueil': 'event',
      'data': evenement,
      'titre':evenement.nom
    });
  }

}
