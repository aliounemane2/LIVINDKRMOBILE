import { Component } from '@angular/core';
import {Icon} from 'ionic-angular/components/icon/icon';
import {ViewController} from 'ionic-angular';

/**
 * Generated class for the RateComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'rate',
  templateUrl: 'rate.html',
})
export class RateComponent {

  text: string;
  valrech: any;
  insRecherche: any;
  institution: any;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello RateComponent Component');
    this.text = 'Hello World';
    this.valrech = 0;
    //this.institution = this.navParams.get('institution');
    //console.log(this.institution);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  getItemsDecouverte(ev) {
    this.valrech = 1;
    
    // Reset items back to all of the items
    
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.insRecherche = this.institution.filter((item) => {
        return (item.tag.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    if (val == '' || !val){
      this.valrech = 0;
      this.insRecherche = this.institution;
    }
    console.log(this.insRecherche);
    console.log(this.institution);
    console.log(this.valrech);
  }

}
