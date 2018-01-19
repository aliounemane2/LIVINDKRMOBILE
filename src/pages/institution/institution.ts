import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events } from 'ionic-angular';
import { CarteMapPage } from '../carte-map/carte-map';
//import { InstitutionPage } from '../institution/institution';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { CallNumber } from '@ionic-native/call-number';

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

  constructor(public navCtrl: NavController, public navParams: NavParams ,private alertCtrl: AlertController,private eventService:EventServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, private callNumber: CallNumber) {
  	this.inst ='description';
    if(navParams.get("ins") !== "undefined")
    {

      this.institution = navParams.get("ins");
      this.categroie = navParams.get("categorie");
      this.url = navParams.get("url");
      console.log(this.institution);
      console.log(this.categroie);
      this.valuePhoto = false;
      this.valueAvis = false;
    }
  }

  onRatingChange(score: number) {
    this.averageRating = score;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstitutionPage');
    //this.getVignetteIns();
    this.getVignetteByInstitution(this.institution);
    //this.getAvisIns();
    this.getAvisByInsitution(this.institution);
  }

  callNumeroTelephone(telephone){
    this.callNumber.callNumber(telephone, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  getAvisIns(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getAvisIns().subscribe(
        data => {
            this.avis = data; 
            console.log(this.avis);
                if(this.avis == 0){
                  let titre ="Pas de avis  a afficher";
                  console.log(this.avis+' 1');

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

  getVignetteIns(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getVignetteIns().subscribe(
        data => {
            this.vignette = data; 
            console.log(this.vignette);
                if(this.vignette == 0){
                  let titre ="Pas de vignette  a afficher";
                  console.log(this.vignette+' 1');

                }
                else{
                  console.log(this.vignette);
                  
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

  goToCarteMap(inst){
    this.navCtrl.push(CarteMapPage, {
      'accueil': 'event',
      'data': inst,
      'titre':inst.nom
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

}
