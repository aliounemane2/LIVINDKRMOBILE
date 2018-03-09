import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, AlertController } from 'ionic-angular';
import { CarteMapPage } from '../carte-map/carte-map';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { Calendar } from '@ionic-native/calendar';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';
import { Toast } from '@ionic-native/toast';


declare var plugins;

/**
 * Generated class for the DetailsEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-event',
  templateUrl: 'details-event.html',
})
export class DetailsEventPage {
        eventdetails : any;
        evenement: any;
  averageRating: any;
  vignette: any;
  photos: any;
  url: any;

  constructor(public connectivityService:ConnectvityServiceProvider,public navCtrl: NavController, public navParams: NavParams, private eventService:EventServiceProvider, public loading: LoadingController, public platform: Platform,private calendar: Calendar, private alertCtrl: AlertController, private toast: Toast) {
        this.eventdetails ='description';
        if(navParams.get("evenement") !== "undefined")
        {

          this.evenement = navParams.get("evenement");
          this.url = navParams.get("url");
          this.averageRating = this.evenement.note;
          console.log(this.evenement);
          console.log(this.evenement.note);
        }
  }

  onRatingChange(score: number) {
    this.averageRating = score;
  }

  presentPromptOk(titre) {
    let alert = this.alertCtrl.create({
      title: titre,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            //this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsEventPage');
    //this.connectivityService.checkNetwork();
    this.getPhotoByEvent(this.evenement);
  }
  goToCarteMap(evenement){
    this.navCtrl.push(CarteMapPage, {
      'accueil': 'event',
      'data': evenement,
      'titre':evenement.nom
    });
  }

  addEvent(evenement){
    //var success = function(message) { alert("Success: " + JSON.stringify(message)); };
    //var error = function(message) { alert("Error: " + message); };
    var endDate = this.incrementDate(evenement.idEvent.dateEvent, 1)
    var startDate = this.incrementDate(evenement.idEvent.dateEvent, 0)
    //alert(evenement.nom+" _ "+endDate);

    console.log(evenement.idEvent.nomEvent+" "+evenement.idEvent.idPlace.adressePlace+" "+evenement.idEvent.nomEvent+" "+startDate+" "+endDate);

    this.calendar.createEvent(evenement.idEvent.nomEvent, evenement.idEvent.idPlace.adressePlace, evenement.idEvent.nomEvent, startDate, endDate).then(
      (msg) => {
        let titre ="Evénement ajouté avec succés dans le calendrier";
        this.showToast(titre);
        console.log(msg); },
      (err) => {
        let titre ="Une erreur est survenue reessayer plus tard ";
        this.showToast(titre);
        console.log(err); }
    );
  }

  scheduleEvents(evenement){
    this.calendar.hasReadWritePermission().then((result)=>{
    if(result === false){
        this.calendar.requestReadWritePermission().then((v)=>{
            this.addEvent(evenement);
        },(r)=>{
            console.log("Rejected");
        })
    }
    else
    {
        this.addEvent(evenement);
    }
    })
  }

  incrementDate(date, amount) {
    var tmpDate = new Date(date);
    tmpDate.setDate(tmpDate.getDate() + amount)
    return tmpDate;
  };



  getPhotoByEvent(event){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getPhotoByEvent(event.idEvent.idEvent).subscribe(
        data => {
            this.photos = data.events_photos;
            console.log(this.photos);
                if(!this.photos){
                  let titre ="Pas de avis  a afficher";
                  console.log(titre);

                }
                else{

                  console.log(this.photos);

                }
            },
            err => {
                //console.log(err);
                loader.dismiss();
                let titre ="Une erreur est survenue reessayer plus tard ";
                //this.presentPromptOk(titre);
            },
            () => {loader.dismiss()}
      );
    })
  }

  showToast(message){
   this.toast.show(message, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}