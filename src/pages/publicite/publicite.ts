import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';

/**
 * Generated class for the PublicitePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicite',
  templateUrl: 'publicite.html',
})
export class PublicitePage {
	pub1: any;
	pub2: any;
  pub3: any;
  publicite: any = this.navParams.get('pub');
  url: any = this.navParams.get('url');

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  	this.pub1 = 0;
  	this.pub2 = 0;
    this.pub3 = 0;
    console.log(this.publicite);
    console.log(this.url);
    /*setTimeout(() => { // <=== 
      //this.navCtrl.setRoot(AccueilPage);
      this.viewCtrl.dismiss();
    }, 10000);*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicitePage');
  }
  closePub(){
  	//this.navCtrl.setRoot(AccueilPage);
    this.viewCtrl.dismiss();
  }

  closePub1(){
  	this.pub1 = 1;
  }
  closePub2(){
  	this.pub2 = 1;
  }
  closePub3(){
  	this.pub3 = 1;
  }

}
