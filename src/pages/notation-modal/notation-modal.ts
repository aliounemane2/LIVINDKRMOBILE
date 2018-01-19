import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { LocationsProvider } from '../../providers/locations/locations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the NotationModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notation-modal',
  templateUrl: 'notation-modal.html',
})
export class NotationModalPage {
	texte: any = this.navParams.get('ret');
  inst: any = this.navParams.get('ins');
	averageRating: any;
  public locationTracker: LocationTrackerProvider
  myFormulaire: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public EventService: EventServiceProvider, public loading: LoadingController, private toastCtrl: ToastController, public formBuilder: FormBuilder) {
  	this.averageRating = 0;
    this.myFormulaire = formBuilder.group({
      avis: ['', Validators.compose([Validators.maxLength(255), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotationModalPage');
  }
  onRatingChange(score: number) {
    this.averageRating = score;
  }

  closeModal() {
    //this.locationTracker.stopTracking();
    console.log(this.locationTracker);
    this.viewCtrl.dismiss();
    
  }

  noterInstitution() {
    //this.locationTracker.stopTracking();
    //console.log(this.locationTracker);
    console.log(this.averageRating);
    this.viewCtrl.dismiss();
    
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle',
      cssClass: 'toast-class'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  addNoteIns(){
    if(!this.myFormulaire.valid){
      console.log("Remplissez tous les champs!");
      let message = "Remplissez tous les champs!";
      //this.showToast("Remplissez tous les champs!");
      //this.presentToast(message);
    }
    else{
      let loader = this.loading.create({
        content: 'Chargement en cours...',
      });

      loader.present().then(() => {

        var json = this.myFormulaire.value;

        var note ={idInstitution:this.inst.idInstitution, idUser:6, note:this.averageRating, avis:json.avis, idEvent:null};
        console.log(note);
        
        this.EventService.addNoteInstitution(note).subscribe(
            data => {
              console.log(data);
              if(data.note){
                this.presentToast(data.message);
                this.viewCtrl.dismiss();
                
              }
              else{
                this.presentToast(data.message);

              }

            },
            err => {
                //console.log(err);
                loader.dismiss();
            },
            () => {loader.dismiss()}

          );
        
        });

    }
    
    
  }

}
