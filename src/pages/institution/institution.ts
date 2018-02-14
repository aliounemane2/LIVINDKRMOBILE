import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events, Platform } from 'ionic-angular';
import { CarteMapPage } from '../carte-map/carte-map';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { CallNumber } from '@ionic-native/call-number';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';


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

  constructor(public platform: Platform, public connectivityService:ConnectvityServiceProvider, public navCtrl: NavController, public navParams: NavParams ,private alertCtrl: AlertController,private eventService:EventServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, private callNumber: CallNumber, private sqlite: SQLite, private toast: Toast) {
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

    this.data = { nomIns:this.institution.nomIns, photoIns:this.institution.photoIns, descriptionIns:this.institution.descriptionIns, adresseIns:this.institution.adresseIns, latitudeIns:this.institution.latitudeIns,longitudeIns: this.institution.longitudeIns,telephoneIns:this.institution.telephoneIns ,price:this.institution.price, idCategory:this.institution.idCategory.idCategory, idInterest:this.institution.interestIdInterest.idInterest };
  }

  onRatingChange(score: number) {
    this.averageRating = score;
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
      if(this.getCurrentData(this.institution.idInstitution)){
        db.executeSql('INSERT INTO institution VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[this.institution.idInstitution,this.data.nomIns,this.data.photoIns,
        this.data.descriptionIns,this.data.adresseIn,
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
        });
      }
      else{
        console.log("Institution déja aoutée comme favoris ");
        this.showToast("Institution déja aoutée comme favoris ");
      }
      
    }).catch(e => {
      console.log(e);

      console.log("Ok enregitre "+ e);
      this.showToast(e);
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
            return true;
          }
          return false;
        })
        .catch(e => {
          console.log(e);
          this.showToast(e);
        });
    }).catch(e => {
      console.log(e);
      this.showToast(e);
      
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
