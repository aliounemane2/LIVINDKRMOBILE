import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from 'ionic-native';
//import { Network } from '@ionic-native/network';
import { Platform, AlertController } from 'ionic-angular';

declare var Connection;
declare var navigator: any;
declare var cordova: any;
declare var google;

/*
  Generated class for the ConnectvityServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ConnectvityServiceProvider {
	onDevice: boolean;

  constructor(public http: Http, public platform: Platform, private alertCtrl: AlertController) {
    console.log('Hello ConnectvityServiceProvider Provider');
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if(this.onDevice && Network.onConnect()){
      return Network.onConnect() !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if(this.onDevice && Network.onConnect){
      return Network.onConnect === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }

  checkNetwork() {
    this.platform.ready().then(() => {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';
      if(networkState === Connection.UNKNOWN || networkState === Connection.NONE){
        let alert = this.alertCtrl.create({
          title: "Connection Status",
          subTitle: states[networkState],
          message: "Impossible de se connecter. Voulez vous activer votre connexion Internet?",
          buttons: [
            /*{
              text: 'NON',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                navigator.app.exitApp();
              }
            },*/
            {
              text: 'OUI',
              handler: () => {
                console.log('Activer Internet');
                this.showSettings();
              }
            }
          ]
        });
        alert.present();
      }
    });
  }

  showSettings() {
    if (cordova.plugins.diagnostic.switchToWifiSettings) {
      cordova.plugins.diagnostic.switchToWifiSettings();
    } else {
      cordova.plugins.diagnostic.switchToSettings();
    }
    //navigator.app.exitApp();
  }

}
