import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  }

}
