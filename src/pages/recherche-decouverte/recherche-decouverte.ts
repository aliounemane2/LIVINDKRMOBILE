import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Searchbar } from 'ionic-angular';
/**
 * Generated class for the RechercheDecouvertePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recherche-decouverte',
  templateUrl: 'recherche-decouverte.html',
})
export class RechercheDecouvertePage {

  @ViewChild(Searchbar) searchbar: Searchbar;
  text: string;
  valrech: any;
  insRecherche: any;
  institution: any;
  categorie: any;
  catRech: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, public modal: ModalController) {
  	if(navParams.get("institution") !== "undefined" && navParams.get("cat") !== "undefined" )
    {
      this.institution = navParams.get("institution");
      this.categorie = navParams.get("cat");
      console.log(this.institution);
      console.log(this.categorie);
      
    }
    this.valrech = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechercheDecouvertePage');
  }
  ionViewDidEnter() {
      setTimeout(() => {
        this.searchbar.setFocus();
   });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(tag: any) {
  	
    this.insRecherche = this.institution.filter((item) => {
        return (item.idTagDecouverte.nomTagDecouverte.toLowerCase().indexOf(tag.nomTagDecouverte.toLowerCase()) > -1);
    })
    this.viewCtrl.dismiss(this.insRecherche);
  }

  getItemsDecouverte(ev) {
    this.valrech = 1;
    
    // Reset items back to all of the items
    
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.catRech = this.categorie.filter((item) => {
        return (item.nomTagDecouverte.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    if (val == '' || !val){
      this.valrech = 0;
      this.catRech = this.categorie;
    }
    console.log(this.catRech);
    console.log(this.categorie);
    console.log(this.valrech);
  }

}
