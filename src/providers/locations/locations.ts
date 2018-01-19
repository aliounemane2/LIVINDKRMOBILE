import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/*
  Generated class for the LocationsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationsProvider {
	data: any;
	latLng: any;
    loc: any;

  constructor(public http: Http, private geolocation: Geolocation) {
    console.log('Hello LocationsProvider Provider');
    //this.load();
    this.loc = this.load();
    console.log(this.loc);
  }

  load(){
 
        /*if(this.data){
            return Promise.resolve(this.data);
        }*/
 
       //return new Promise(resolve => {
 
            this.http.get('assets/data/evenements.json').map(res => res.json()).subscribe(data => {
 
                this.data = this.applyHaversine(data);
                //console.log(this.data);
                this.data.sort((locationA, locationB) => {
                	//console.log(locationA.date);
                	//console.log(locationB.distance);
                    return locationA.distance - locationB.distance;

                });
 
                //resolve(this.data);
                //console.log(this.data);
                return(this.data);
            });
 
        //});
 
    }

    applyHaversine(locations){

        this.geolocation.getCurrentPosition().then((position) => {
	  		this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	  		let usersLocation = {
	            lat: position.coords.latitude,
	            lng: position.coords.longitude
	        };

	        //console.log(usersLocation);

	  		locations.map((location) => {
 
	            let placeLocation = {
	                lat: location.lattitude,
	                lng: location.longitude
	            };

	            //console.log(placeLocation);
	 
	            location.distance = this.getDistanceBetweenPoints(
	                usersLocation,
	                placeLocation,
	                'miles'
	            ).toFixed(2);
	            //console.log(location.distance);
        	});
  		});
		//console.log(locations);
        return locations;

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

}
