import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { DetailsFavorisPage } from '../details-favoris/details-favoris';
import { Observable } from 'rxjs';

/**
 * Generated class for the FavorisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {
  institution: any;
  message:any;
  valueIns: any;
  data: any;
  base64Image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private toast: Toast) {
    this.valueIns = false;
    this.data = {idInstitution:0, nomIns:"", photoIns:"", 
    descriptionIns:"", adresseIns:"", 
    latitudeIns:"",longitudeIns: "",
    telephoneIns:"" ,price:"", 
    idCategory:"", 
    idInterest:"" };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
    this.getData();
  }

  getData() {
    this.sqlite.create({
      name: 'livindk.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS institution(idInstitution INTEGER PRIMARY KEY, nomIns TEXT, photoIns TEXT, descriptionIns TEXT, adresseIns TEXT, latitudeIns TEXT, longitudeIns TEXT, telephoneIns TEXT, price TEXT, idCategory TEXT, idInterest TEXT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM institution ORDER BY idInstitution DESC', {})
      .then(res => {
        this.institution = [];
        for(var i=0; i<res.rows.length; i++) {
          /*this.getBase64ImageFromURL(res.rows.item(i).photoIns).subscribe(base64data => {
            console.log(base64data);
            this.base64Image = 'data:image/jpg;base64,' + base64data;
          });*/
          this.institution.push({idInstitution:res.rows.item(i).idInstitution,nomIns:res.rows.item(i).nomIns,photoIns:res.rows.item(i).photoIns,descriptionIns:res.rows.item(i).descriptionIns,latitudeIns:res.rows.item(i).latitudeIns,longitudeIns:res.rows.item(i).longitudeIns,telephoneIns:res.rows.item(i).telephoneIns,price:res.rows.item(i).price,idCategory:res.rows.item(i).idCategory,idInterest:res.rows.item(i).idInterest})
        }
        if(this.institution.length == 0){
          this.valueIns = true;
          this.message =" Pas de favoris";
        }
      })
    }).catch(e => console.log(e));
  }

  deleteData(idInstitution) {
    this.sqlite.create({
      name: 'livindk.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM institution WHERE idInstitution=?', [idInstitution])
      .then(res => {
        console.log(res);
        this.showToast("Institution supprimée");
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  getCurrentData(idInstitution) {
    this.sqlite.create({
      name: 'livindk.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM institution WHERE idInstitution=?', [idInstitution])
        .then(res => {
          if(res.rows.length > 0) {
            this.data = res.rows.item(0);
            //this.showToast(this.data.photoIns);
            this.goToDetaisFavoris(this.data);
          }
          else{
            
          };
        })
        .catch(e => {
          console.log(e);
          this.showToast(e);
          this.showToast("Erreur 1");
        });
    }).catch(e => {
      console.log(e);
      this.showToast(e);
      this.showToast("Erreur 2");
      
    });
  }

  getBase64ImageFromURL(url) {
    return Observable.create((observer) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image1(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image1(img));
        observer.complete();
      }
    });
  }

  getBase64Image1(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/jpg");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  goToDetaisFavoris(institution){
    this.navCtrl.push(DetailsFavorisPage, {
      'ins': institution
    });
  }

  showToast(message){
   this.toast.show(message, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
