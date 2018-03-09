import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarteMapPage } from '../carte-map/carte-map';

/**
 * Generated class for the DetailsFavorisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-favoris',
  templateUrl: 'details-favoris.html',
})
export class DetailsFavorisPage {

  institution: any;
  inst: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.inst ='description';
    if(navParams.get("ins") !== "undefined")
    {
      this.institution = navParams.get("ins");
      console.log(this.institution);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsFavorisPage');
  }

  goToCarteMap(inst){
    this.navCtrl.push(CarteMapPage, {
      'accueil': 'event',
      'data': inst,
      'titre':inst.nomIns
    });
  }

}
