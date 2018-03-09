import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events, Platform } from 'ionic-angular';
import { CarteMapPage } from '../carte-map/carte-map';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { CallNumber } from '@ionic-native/call-number';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {StorageUtils} from '../../Utils/storage.utils';
import { Observable } from 'rxjs';
//import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';



declare var cordova: any;



/**
 * Generated class for the InstitutionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-institution',
  templateUrl: 'institution.html',
})
export class InstitutionPage {
	institution: any;
	inst : any;
  averageRating: any;
  vignette: any;
  avis: any;
  categroie: any;
  insWeb: any;
  allNote: number;
  moyenne: any;
  url: any;
  messageAvis: any;
  messagephoto: any;
  valuePhoto: any;
  valueAvis: any;
  menu: any;
  messageMenu: any;
  valueMenu : any;
  data: any;
  verifIdInstitution: any;
  photo: any;
  base64Image: any;
  linkImage: any;
  storageDirectory: string = '';
  private headers = new Headers({'Content-Type': 'application/json',
  'Authorization': StorageUtils.getToken()});
  private options = new RequestOptions({headers: this.headers});

  constructor(public platform: Platform, public connectivityService:ConnectvityServiceProvider, 
    public navCtrl: NavController, public navParams: NavParams ,
    private alertCtrl: AlertController,private eventService:EventServiceProvider, 
    public loading: LoadingController,public viewCtrl: ViewController, 
    private callNumber: CallNumber, private sqlite: SQLite, 
    private toast: Toast, public http: Http,private transfer: FileTransfer, private file: File) {

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        //return false;
      }
  	this.inst ='description';
    

    if(navParams.get("ins") !== "undefined")
    {

      this.institution = navParams.get("ins");
      this.categroie = navParams.get("categorie");
      this.url = navParams.get("url");
      console.log(this.institution);
      console.log(this.url);
      console.log(this.categroie);
      this.valuePhoto = false;
      this.valueAvis = false;
      this.valueMenu = false;
    }

    

    this.data = { nomIns:this.institution.nomIns, photoIns:this.url+'/'+this.institution.photoIns, 
      descriptionIns:this.institution.descriptionIns, adresseIns:this.institution.adresseIns, 
      latitudeIns:this.institution.latitudeIns,longitudeIns: this.institution.longitudeIns,
      telephoneIns:this.institution.telephoneIns ,price:this.institution.price, 
      idCategory:this.institution.idCategory.idCategory, 
      idInterest:this.institution.interestIdInterest.idInterest };
      console.log(this.url+"/"+this.institution.photoIns);
      this.downloadImage(this.url+"/"+this.institution.photoIns);
      //this.photo = this.getBase64Image(this.institution.photoIns);
      //this.convertToDataURLviaCanvas(this.url+'/'+this.institution.photoIns, "image/jpeg")
      /*this.convertToDataURLviaCanvas("assets/images/briochedore5.jpg", "image/jpeg")
      .then(base64 => {
        this.photo = 'data:image/jpg;base64,'+base64;
        console.log(this.photo);
      })*/
      //this.download();
      
      /*console.log(this.photo);
      this.linkImage = this.http.get(this.url+'/'+this.institution.photoIns, this.options);
      this.getBase64ImageFromURL(this.url+'/'+this.institution.photoIns).subscribe(base64data => {
        console.log(base64data);
        this.base64Image = 'data:image/jpg;base64,' + base64data;
      });
      console.log(this.base64Image);
    const toDataURL = url => fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': StorageUtils.getToken()
      }})
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))
  
  
  //toDataURL(this.url+"/"+this.institution.photoIns)
  toDataURL("http://www.footmercato.net/images/a/neymar-a-livre-ses-verites-sur-sa-situation-au-psg_213987.jpg")
    .then(dataUrl => {
      console.log('RESULT:', dataUrl)
    })*/
  }

  onRatingChange(score: number) {
    this.averageRating = score;
  }

  download() {
    alert("ppp");
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.url+"/"+this.institution.photoIns;
    fileTransfer.download(url, this.file.dataDirectory + this.institution.photoIns).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.base64Image = entry.toUrl();
      alert('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
      alert('download not complete: ' + error);
    });
  }

  downloadImage(image) {
    this.platform.ready().then(() => {

      const fileTransfer: FileTransferObject = this.transfer.create();

      //const imageLocation = `${cordova.file.applicationDirectory}www/assets/img/${image}`;
      const imageLocation = this.url+"/"+this.institution.photoIns;

      fileTransfer.download(imageLocation, this.storageDirectory + this.institution.photoIns).then((entry) => {

        const alertSuccess = this.alertCtrl.create({
          title: `Download Succeeded!`,
          subTitle: `${image} was successfully downloaded to: ${entry.toURL()}`,
          buttons: ['Ok']
        });
        
        
        this.getBase64ImageFromURL(`${entry.toURL()}`).subscribe(base64data => {
          console.log(base64data);
          this.base64Image = 'data:image/jpg;base64,' + base64data;
          this.photo = `${entry.toURL()}`;
        });

        //alertSuccess.present();

      }, (error) => {

        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          subTitle: `${image} was not successfully downloaded. Error code: ${error.code}  ${imageLocation}`,
          buttons: ['Ok']
        });

        //alertFailure.present();

      });

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

  

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/jpg");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  convertToDataURLviaCanvas(url, outputFormat){
    return new Promise((resolve, reject) => {
    let img = new Image();
    img.crossOrigin = 'cheikh';
    img.onload = () => {
      let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      resolve(dataURL);
      console.log(dataURL);
      canvas = null;
    };
    img.src = url;
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstitutionPage');
    //this.connectivityService.checkNetwork();
    this.getVignetteByInstitution(this.institution);
    this.getAvisByInsitution(this.institution);
    this.getMenuByInstitution(this.institution)
  }

  callNumeroTelephone(telephone){
    this.platform.ready().then(() => {
      this.callNumber.callNumber(telephone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
    })
  }


  goToCarteMap(inst){
    this.navCtrl.push(CarteMapPage, {
      'accueil': 'event',
      'data': inst,
      'titre':inst.nomIns
    });
  }

  getVignetteByInstitution(ins){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getVignetteByInstitution(ins.idInstitution).subscribe(
        data => {
            this.vignette = data.category; 
            console.log(this.vignette);
                if(!this.vignette){
                  let titre ="Pas de categories  a afficher";
                  console.log(titre);
                  this.messagephoto = "Pas de photo à afficher ";
                  this.valuePhoto = true;
                }
                else{
                  console.log(this.vignette);

                  
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

  getMenuByInstitution(ins){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getMenuByInstitution(ins).subscribe(
        data => {
            this.menu = data.institutionMenu; 
            console.log(this.menu);
                if(!this.menu){
                  let titre ="Pas de menu  a afficher";
                  console.log(titre);
                  this.messageMenu = "Pas de Menu disponible pour ce restaurant ";
                  this.valueMenu = true;
                }
                else{
                  console.log(this.menu);

                  
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

  getAvisByInsitution(ins){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getAvisByInsitution(ins.idInstitution).subscribe(
        data => {
            this.avis = data.notes; 
            console.log(this.avis);
                if(!this.avis){
                  let titre ="Pas de avis  a afficher";
                  this.messageAvis = "Pas d'avis à afficher ";
                  this.valueAvis = true;
                  console.log(titre);

                }
                else{
                  let lnote;
                  let nbAvis = 0;
                  console.log(this.avis);
                  this.allNote = 0;
                  for(var i = 0; i < this.avis.length; i++ )
                  {
                    lnote = this.avis[i].note;
                    nbAvis = nbAvis + 1;
                    console.log(lnote);
                    this.allNote = this.allNote + lnote;
                  }
                  this.moyenne = this.allNote/nbAvis;
                  console.log(this.moyenne);
                  
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


  saveData() {
    this.sqlite.create({
      name: 'livindk.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.getCurrentData(this.institution.idInstitution);
      if(this.verifIdInstitution == 0){
        console.log("Institution déja aoutée comme favoris ");
        this.showToast("Institution déja aoutée comme favoris ");
      }
      else{
        
        db.executeSql('INSERT INTO institution VALUES(?,?,?,?,?,?,?,?,?,?,?)',[this.institution.idInstitution,
          this.data.nomIns,this.photo,
        this.data.descriptionIns,this.data.adresseIns,
        this.data.latitudeIns,this.data.longitudeIns,this.data.telephoneIns,
        this.data.price,this.data.idCategory,this.data.idInteret])
        .then(res => {
          console.log(res);
          console.log("Ok enregitre");
          this.showToast("Institution aoutée comme favoris ");
          
        })
        .catch(e => {
          console.log(e);
          console.log("Ok non enregitre "+ e);
          this.showToast(e);
          this.showToast("Erreur 4");
        });
      } 
    }).catch(e => {
      console.log(e);

      console.log("Ok enregitre "+ e);
      this.showToast(e);
      this.showToast("Erreur 5");
    });
  }

  getCurrentData(idInstitution) {
    this.sqlite.create({
      name: 'livindk.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM institution WHERE idInstitution=?', [idInstitution])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.idInstitution = res.rows.item(0).idInstitution;
            this.verifIdInstitution = 0;
            this.showToast(this.verifIdInstitution);
          }
          else{
            this.verifIdInstitution = 1;
            this.showToast(this.verifIdInstitution);
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

  showToast(message){
   this.toast.show(message, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
