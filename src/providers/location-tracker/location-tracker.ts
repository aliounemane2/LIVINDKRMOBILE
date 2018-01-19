import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse  } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { EventServiceProvider } from '../event-service/event-service';
import { IonicPage, NavController, Platform, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events, ModalController  } from 'ionic-angular';
import { NotationModalPage } from '../../pages/notation-modal/notation-modal';
import { ConnectvityServiceProvider } from '../connectvity-service/connectvity-service';
import { Diagnostic } from '@ionic-native/diagnostic';

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  public institution: any;
  public data: any;
  note: any;
  notes: any;
  val: any;

  constructor(private diagnostic: Diagnostic, public http: Http, public zone: NgZone, public eventService:EventServiceProvider, public loading: LoadingController, private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation, public alertCtrl: AlertController, public modalCtrl: ModalController, public connectivityService:ConnectvityServiceProvider, public platform: Platform) {
    this.connectivityService.checkNetwork();
    this.val = 0;
    console.log('Hello LocationTrackerProvider Provider');
    this.checkLocation();
    //this.getNotes();
    
  }

  getInstitution(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getIns().subscribe(
        data => {
            this.institution = data; 
            console.log(this.institution);
                if(this.institution == 0){
                  let titre ="Pas de institution  a afficher";
                  console.log(this.institution+' 1');

                }
                else{
                  console.log(this.institution);
                  this.startTracking();
                  
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

  getAllInstitutions(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getAllInstitutions().subscribe(
        data => {
            this.institution = data.institution; 
            console.log(this.institution);
                if(!this.institution){
                  let titre ="Pas de institution  a afficher";
                  console.log(this.institution+' 1');

                }
                else{
                  console.log(this.institution);
                  this.startTracking();
                  
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


  getNotes(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getNotes().subscribe(
        data => {
            this.note = data; 
            console.log(this.note);
                if(this.note == 0){
                  let titre ="Pas de note  a afficher";
                  console.log(this.note+' 1');

                }
                else{
                  console.log(this.note);
                  
                }
            },
            err => {
                console.log(err);
                loader.dismiss();
                let titre ="Une erreur est survenue reessayer plus tard ";
                //this.presentPromptOk(titre);
                
            },
            () => {
                loader.dismiss();
            }
      );
    })
  }

  checkLocation()
  {
    //this.platform.ready().then((readySource) => {

      //this.diagnostic.isLocationEnabled().then((isAvailable) => {

      this.getAllInstitutions();
      //alert('Is available? ' + isAvailable);
      /*}).catch( (e) => {
      console.log(e);
      //alert(JSON.stringify(e));
      //this.stopTracking();
      });*/


    //});
  }

  startTracking() {
	  	// Background Tracking 
	  let config = {
	    desiredAccuracy: 0,
	    stationaryRadius: 20,
	    distanceFilter: 10,
	    debug: true,
	    interval: 2000
	  };
    console.log(this.note);
	 
	  this.backgroundGeolocation.configure(config).subscribe((location) => {
	 
	    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
	 
	    // Run update inside of Angular's zone
	    this.zone.run(() => {
	      this.lat = location.latitude;
	      this.lng = location.longitude;
	    });
	 
	  }, (err) => {
	 
	    console.log(err);
	 
	  });
	 
	  // Turn ON the background-geolocation system.
	  this.backgroundGeolocation.start();
	 
	 
	  // Foreground Tracking
	 
		let options = {
		  frequency: 3000,
		  enableHighAccuracy: true
		};
	 
		this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
		 
		  console.log(position);
		 
		  // Run update inside of Angular's zone
		  this.zone.run(() => {
		  	var now = new Date();
		    this.lat = position.coords.latitude;
		    this.lng = position.coords.longitude;

		    //ajout
        //this.getInstitution();
        console.log(this.institution);

		    this.data = this.applyHaversine(this.institution, this.lat, this.lng);
		    for(var i = 0; i < this.data.length; i++){
		    	if(this.data[i].distance == '6.82'){
            
            if(this.val == 0){
              console.log('pppppkkkk');
              setTimeout(() => 
              { // <=== 
                console.log('Vous êtes détecté à '+this.data[i].nomIns+' voulez-vous noter cet endroit ?');
                let texte = 'Votre présence est détectée à '+this.data[i].nomIns+' voulez-vous noter cet endroit ?';
                let obj = {userId: 5, name: 'Bob', ret: texte,ins: this.data[i]};
                this.openModal(obj);
              }, 60000);
            }
            
            this.val = 1;
            console.log(this.val);
            break;
            
		    	}
          /*else{
             console.log('pppppooo');
            setTimeout(() => { // <=== 
              console.log('ppppp');
              let texte = 'Vous etes detecte a '+this.data[i].nom+' voulez vous noter cet endroit';
              let obj = {userId: '1', name: 'Bob', ret: texte};
              this.openModal(obj);
            }, 20000);
            break;
            
          }*/
		    }
		    //fin ajout
		  });
		 
		});
  }
 
  stopTracking() {
  	console.log('stopTracking');
 
	this.backgroundGeolocation.finish();
	this.watch.unsubscribe();
  }

  getDistanceBetweenPoints(start, end, units){
 
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;
 
        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
 
        return d;
 
    }
 
    toRad(x){
        return x * Math.PI / 180;
    }

    applyHaversine(locations, latt, long){
  		let usersLocation = {
            lat: latt,
            lng: long
        };

        console.log(usersLocation);

  		locations.map((location) => {

            let placeLocation = {
                lat: location.latitudeIns,
                lng: location.longitudeIns
            };

            console.log(placeLocation);
 
            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'miles'
            ).toFixed(2);
            console.log(location.distance);
    	});
		
		console.log(locations);
    	return locations;
    }

  openModal(data) {
    let myModal = this.modalCtrl.create(NotationModalPage, data,
    {
      cssClass: 'settings-modal'
    });
    myModal.present();
  }

}
