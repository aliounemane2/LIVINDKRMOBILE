import { DetailsEventPage } from '../details-event/details-event';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
//import { LocationsProvider } from '../../providers/locations/locations';
import * as _ from 'lodash';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';



/**
 * Generated class for the EvenementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Pipe({
  name: 'orderByPipe'
})

export class OrderByPipe implements PipeTransform{

 transform(array: Array<string>, args: string): Array<string> {

  if(!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}

@IonicPage()
@Component({
  selector: 'page-evenement',
  templateUrl: 'evenement.html',
})
export class EvenementPage {
  evenements: any;
  typeEvents:  any ; 
  location: any;
  typeEvent: any;
  filterVal: any;
  customRange: any;
  semaine: any;
  jour: any;
  mois: any;
  sms: any;
  messageJour: any;
  messageMois: any;
  messageSemaine: any;
  message: any;
  valueJour: any;
  valueSemaine: any;
  valueMois: any;
  masque: any;
  value: any;
  val: any;
  valmois: any;
  insMois: any;
  valjour: any;
  insJour: any;
  valSemaine: any;
  insSemaine: any;
  insWeb: any;
  vv: any;
  url: any;
  valueSms: any;
  
  

  constructor(public connectivityService:ConnectvityServiceProvider, public navCtrl: NavController, public navParams: NavParams ,private alertCtrl: AlertController,private eventService:EventServiceProvider, public loading: LoadingController,public viewCtrl: ViewController) {
    this.typeEvents = 
    [
      {id: 0, val:"Tous"},
      {id: 1, val:"Centre d'interet"},
      {id: 2, val:"Ma position"}
    ];
    console.log(this.typeEvents);
    console.log(this.typeEvent);
    this.typeEvent = 0;
    this.valueJour =1;
    this.valueSemaine =1;
    this.valueMois =1;
    this.masque =false;
    this.value =0;
    this.val =0;
    this.valmois =0;
    this.insMois = [];
    this.valjour =0;
    this.insJour = [];
    this.valSemaine =0;
    this.insSemaine = [];
    this.vv =1;
    this.valueSms =false;
    this.filterVal = 'today';
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvenementPage');

    //this.connectivityService.checkNetwork();
    this.getEvents();
    
  }
  goToDetailsEvent(evenement){
  	this.navCtrl.push(DetailsEventPage, {
   		'evenement': evenement,
      'url': this.url
    });
  }

  filtreLocation(){
   console.log(this.typeEvents);
    if(this.typeEvents=='2'){
      
    }
    else{

    }
    
  }

  getItemsMois(ev) {
    // Reset items back to all of the items
    this.valmois = 1;
    this.mois;
    console.log(this.mois);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      if(this.mois){
        this.insMois = this.mois.filter((item) => {
          return (item.idInterest.nomInterest.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      
    }
    console.log(this.insMois);

    if(this.insMois == 0 ){
      this.vv =0;
      this.message = 'Aucun résultat trouvé'+ val;
      console.log(this.message);
    }
    else{
      this.vv =1;
      this.message = '';
      console.log('this.message');
    }

    if (val == '' || !val){
      this.valmois = 0;
      this.insMois = this.mois;
    }
  }

  getItemsJour(ev) {
    // Reset items back to all of the items
    this.valjour = 1;
    this.jour;
    console.log(this.jour);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      if(this.jour){
        this.insJour = this.jour.filter((item) => {
          return (item.idInterest.nomInterest.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

    if(this.insJour == 0 ){
      this.vv =0;
      this.message = 'Aucun résultat trouvé';
    }
    else{
      this.vv =1;
      this.message = '';
    }

    if (val == '' || !val){
      this.valjour = 0;
      this.insJour = this.jour;
    }
  }

  getItemsSemaine(ev) {
    // Reset items back to all of the items
    this.valSemaine = 1;
    this.semaine;
    console.log(this.semaine);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      if(this.semaine){
        this.insSemaine = this.semaine.filter((item) => {
          return (item.idInterest.nomInterest.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      
    }

    if(this.insSemaine == 0 ){
      this.vv =0;
      this.message = 'Aucun résultat trouvé';
    }
    else{
      this.vv =1;
      this.message = '';
    }

    if (val == '' || !val){
      this.valSemaine = 0;
      this.insSemaine = this.semaine;
    }
  }

  clickJour(){
   this.val = 0;
   console.log(this.val);
  }

  clickSemaine(){
    this.val = 1;
    console.log(this.val);
  }

  clickMois(){
    this.val = 2;
    console.log(this.val);
  }

  openRecherche(){
    if(this.masque){
      this.value =2;
    }
    else{
      this.value =0;
    }
    this.masque = !this.masque;
  }

  getEvents(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getEvents().subscribe(
        data => {
          this.evenements = data.article; 
          this.url = data.urls; 
          // this.evenements = data; 
          console.log(this.evenements);
          if(data.status == 0){
            console.log(this.evenements);
            this.jour = [];
            this.semaine = [];
            this.mois = [];
            var i,
            tempTime,lastDayOfMonth,
            now = new Date(),
            lastDayOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - now.getDay()));
            console.log(lastDayOfWeek);

            lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            console.log(lastDayOfMonth);

            this.filterVal = 'today';
            this.customRange = [new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10)];
            console.log(this.customRange);
            for (i = 0; i < this.evenements.length; ++i) 
            {
              console.log(this.evenements[0].idEvent);
              tempTime = this.evenements[i].idEvent.dateEvent;
              console.log(tempTime);
              this.evenements[i].dateEvent = new Date(tempTime);
              console.log(this.evenements[i].dateEvent);
              if(this.evenements[i].dateEvent.getMonth() == now.getMonth() && this.evenements[i].dateEvent.getDate() == now.getDate()) {
                console.log("ppppppppppppp");
                this.jour.push(this.evenements[i]);
                console.log(this.jour.length);
                
              }
              else if (now <= this.evenements[i].dateEvent && this.evenements[i].dateEvent <= lastDayOfWeek) {
                console.log("cccccccccc");
                this.semaine.push(this.evenements[i]);
                console.log(this.semaine.length);
                  
              }
              else if (now < this.evenements[i].dateEvent && this.evenements[i].dateEvent > lastDayOfWeek && this.evenements[i].dateEvent <= lastDayOfMonth) {
                console.log("bbbbbbbbbbb");
                this.mois.push(this.evenements[i]);
                console.log(this.mois.length);
              }        
            }
            console.log(this.jour);
            console.log(this.semaine);
            console.log(this.mois);

            if(this.jour.length == 0){
              this.valueJour =0;
              let titre ="Pas d'événements pour aujourd'hui";           
              this.messageJour = titre;
              console.log(titre);
              console.log(this.valueJour); 
            }

            if(this.semaine.length == 0){
              let titre ="Pas d'événements pour cette semaine";  
              this.valueSemaine =0;         
              this.messageSemaine = titre;
              console.log(titre);
              console.log(this.valueSemaine);  
            }

            if(this.mois.length == 0){
              let titre ="Pas d'événements pour ce mois"; 
              this.valueMois =0;          
              this.messageMois = titre;
              console.log(titre);
              console.log(this.valueMois);
            }
          }
          else{
            let titre ="Pas de categories  a afficher";
            this.sms ="Pas d'événement disponible";
            this.valueSms = true;  
            console.log(this.sms);  
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
