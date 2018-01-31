import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { InstitutionPage } from '../institution/institution';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';



declare var google;

/**
 * Generated class for the CarteMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carte-map',
  templateUrl: 'carte-map.html',
})
export class CarteMapPage {
	@ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  institution: any;
  client: any;
  avis: any;
  vignette: any;
  parent: any;
  event: any;
  categorie: any;
  directionsService: any;
  directionsDisplay: any;
  latLng: any;
  lat: any;
  lng: any;
  rec: any;
  value: any;
  titre: any;
  institutio: any;
  cat: any;
  ca: any;
  url: any;


  constructor(public connectivityService:ConnectvityServiceProvider, private diagnostic: Diagnostic, public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geolocation: Geolocation, private eventService:EventServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, public locationTracker: LocationTrackerProvider,private alertCtrl: AlertController) {
    /*if(navParams.get("accueil") !== "undefined" && navParams.get("data") !== "undefined" )
    {
      this.parent = navParams.get("accueil");
      this.event = navParams.get("data");
      this.categorie = navParams.get("data");
      this.titre = navParams.get("titre");
      
      console.log(this.parent);
      console.log(this.event);
      console.log(this.categorie);
      console.log(this.titre);
    }*/
    this.institution =[];

    if(navParams.get("accueil") !== "undefined"  )
    {
      this.parent = navParams.get("accueil");
      this.event = navParams.get("data");
      this.categorie = navParams.get("data");
      this.titre = navParams.get("titre");
      this.cat = navParams.get("cat");
      this.ca = navParams.get("ca");
      this.url = navParams.get("url");
      console.log(this.ca);
      console.log(this.parent);
      console.log(this.event);
      console.log(this.categorie);
      console.log(this.cat);
      console.log(this.titre);
      console.log(this.url);
    }

    if(this.parent=='accueil'){
      this.value = '1';
    }
    else{
      this.value = '0';
    }

  	this.platform.ready().then(() => {
    	
  	});
  }

  checkLocationA(){
    //this.locationTracker.stopTracking();
    this.platform.ready().then((readySource) => {

      this.diagnostic.isLocationEnabled().then((isAvailable) => {
      
      if(!isAvailable){
        this.presentPromptOk("Veillez activer votre position GPS");
      }
      else{
      
          //this.getIns();
          if(this.ca == 'ca'){
            this.getInstitutionByCategorie(this.cat);
          }
          if(this.ca == 'sca'){
            this.getInstitutionBySousCategorie(this.cat);
          }
          console.log(this.institution);
      }
        
        //this.locationTracker.startTracking(); 
      //alert('Is available? ' + isAvailable);
      }).catch( (e) => {
      console.log(e);
      //alert(JSON.stringify(e));
      let titre =e;
      this.presentPromptOk(titre);
      });


    });
  }

  checkLocationB(){
    this.platform.ready().then((readySource) => {

      this.diagnostic.isLocationEnabled().then((isAvailable) => {
      if(!isAvailable){
        this.presentPromptOk("Veillez activer votre position GPS");
      }
      else{
        this.loadMap1();
        this.startNavigating();
      }
        
      }).catch( (e) => {
      console.log(e);
      let titre =e;
      this.presentPromptOk(titre);
      });


    });
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
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarteMapPage');
    this.connectivityService.checkNetwork();
    
    
    if(this.parent=='accueil'){
       this.checkLocationA();
    }
    else{
       this.checkLocationB();
    }
    
  }
  
  loadMap(){
    console.log(this.institution);
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.geolocation.getCurrentPosition().then((position) => {
 
      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(position.coords.latitude+' - '+position.coords.longitude);
 
      let mapOptions = {
        center: this.latLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            var marqueur;
            var pointLat,pointLng,nomPoint,addressPoint;
            let ins;
            let marker;
            let marqueur1;
            let pinImage;
            let pinImage1;
            pinImage=new google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/009900/");

            marqueur1 = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position:new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
                icon: pinImage
                
              });
              var infoWindowContent1 =  "Ma position actuelle"  ;

              this.addInfoWindow(marqueur1, infoWindowContent1, 'Ma position');

            for(var i=0;i<this.institution.length;i++){
              pointLat = this.institution[i].latitudeIns;
              pointLng = this.institution[i].longitudeIns;
              nomPoint = this.institution[i].nomIns;
              addressPoint = this.institution[i].adresseIns; 
              var record = this.institution[i];
              ins= new google.maps.LatLng(pointLat, pointLng);
              pinImage1=new google.maps.MarkerImage("assets/images/pinimg.png");  
              

              console.log(pointLat+", "+pointLng);
              marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: ins,
                icon: pinImage1

              });

              var markerData = {
                lat: record.latitudeIns,
                lng: record.longitudeIns,
                marker: marker
              };

              var infoWindowContent = '<div id="clickableItem">' + nomPoint + ", " + "<br/>" + record.adresse + '</div>';

              //var infoWindowContent = nomPoint + ", " + "<br/>" + record.adresse;
              this.addInfoWindow(marker, infoWindowContent, record);

            }
            loader.dismiss();
 
    }, (err) => {
      loader.dismiss();
      console.log(err);
    });
    })
 
    
  }

  addInfoWindow(marker, message, record) {
    var infoWindow = new google.maps.InfoWindow({
      content: message
    });

    google.maps.event.addListener(marker, 'click', () => {
      //infoWindow.open(this.map, marker);
      console.log(record);
      if(record != 'Ma position'){
        this.goToInstitu(record);
      }    
    });


  }

  goToInstitu(institution){
    this.navCtrl.push(InstitutionPage, {
      'ins': institution,
      'categorie': this.titre,
      'url': this.url
    });
  }


  loadMap1(){
    console.log(this.institution);
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.geolocation.getCurrentPosition().then((position) => {
        this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(position.coords.latitude, position.coords.longitude);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        let mapOptions = {
          center: this.latLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
   
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        loader.dismiss();

      }, (err) => {
        console.log(err);
        loader.dismiss();
      });
    })
  }
 
  startNavigating(){
        this.geolocation.getCurrentPosition().then((position) => {
          this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          console.log(position.coords.latitude, position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          console.log(this.lat);
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
 
        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);
 
        directionsService.route({
            origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            destination: new google.maps.LatLng(this.event.lattitude, this.event.longitude),
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {
 
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }
 
        });

        }, (err) => {
          console.log(err);
        });
        
 
    }

    getInstitutionByCategorie(categorie){
      let loader = this.loading.create({
      content: 'Chargement en cours...',
      });

      loader.present().then(() => {
      this.eventService.getInstitutionByCategory(categorie.idCategory).subscribe(
        data => {
            this.institution = data.sous_category; 
            console.log(this.institution);
                if(this.institution == null){
                  let titre ="Pas de institution  a afficher";
                  console.log(this.institution+' 1');
                  
                }
                else{
                  console.log(this.institution);
                  this.loadMap();
                  
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

  getInstitutionBySousCategorie(categorie){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getInstitutionBySousCategory(categorie.idSousCategory).subscribe(
        data => {
            this.institution = data.sous_category; 
            console.log(this.institution);
                if(this.institution == null){
                  let titre ="Pas de categories  a afficher";
                  
                }
                else{
                  console.log(this.institution);
                  this.loadMap();
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
