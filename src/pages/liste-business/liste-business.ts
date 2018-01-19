import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events, ModalController } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { CarteMapPage } from '../carte-map/carte-map';
import { InstitutionPage } from '../institution/institution';
import { DetailsSightPage } from '../details-sight/details-sight';
import { NotationModalPage } from '../notation-modal/notation-modal';

/**
 * Generated class for the ListeBusinessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-business',
  templateUrl: 'liste-business.html',
})
export class ListeBusinessPage {
  evenements: any;
  typeEvents:  any ; 
  location: any;
  typeEvent: any;
  categorie: any;
  masque: any;
  val: any;
  value: any;
  institution: any;
  titre: any;
  institutio: any;
  titleCat: any;
  map: any;
  msq: any;
  val1 : any;
  value1 : any;
  price1: any;
  price2: any;
  price3: any;
  price4: any; 
  insRecherche: any;
  valrech: any;
  rech: any;
  insPrice:any;
  nota: any;
  pr: any;
  rec: any;
  valueJour: any;
  message: any;
  message1: any;
  vall: any;
  note :any;
  insWeb:any;
  url: any;


  constructor(public navCtrl: NavController, public navParams: NavParams ,private alertCtrl: AlertController,private eventService:EventServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, public modalCtrl: ModalController) {
  	this.masque =false;
    this.msq = false;
    this.val =0;
    this.val1 =0;
    this.value =0;
    this.value1 =0;
    this.map = 0;
    this.valrech = 0;
    this.rech = 0;
    this.insRecherche = [];
    this.institution =[];
    this.insPrice = [];
    this.rec = 0;
    this.nota = 0;
    this.pr = 0;
    this.valueJour =1;
    this.vall =1;
    this.note =0;

    this.price1 =
    [
      {"id":"1","price":"$"},
      {"id":"1","price":"$$"},
      {"id":"1","price":"$$$"},
      {"id":"1","price":"$$$$"}
    ];
    console.log(this.price1[0].price);
  	if(navParams.get("data") !== "undefined" )
    {
      this.categorie = navParams.get("data");
      this.titre = navParams.get("titre");
      this.titleCat = navParams.get("titleCat"); 
       
      console.log(this.categorie);
      console.log(this.titre);
      console.log(this.titleCat);

      
    }

    if(this.titleCat== 'Shopping' )
    {
      this.rech = 1;
    }

    if(this.titleCat == 'Things To Do' && this.titre == 'Activités')
    {
      this.map = 0;
      this.nota = 0;
      this.pr = 0;
      this.rec = 0;
    }

    if(this.titleCat == 'Things To Do' && this.titre == 'Hotels')
    {
      this.map = 0;
      this.nota = 0;
      this.pr = 0;
      this.rec = 0;
    }

    if(this.titleCat == 'Things To Do' && this.titre == 'Sight-seeing')
    {
      this.map = 0;
      this.nota = 1;
      this.pr = 0;
      this.rec = 1;
    }

    if(this.titleCat == 'Prestataires')
    {
      this.map = 0;
      this.nota = 0;
      this.pr = 1;
      this.rec = 0;
    }
    console.log(this.map);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeBusinessPage');
    //this.getIns();
    this.getInstitutionBySousCategorie(this.categorie);
  }

  afficherMenu(ins){
    if(ins == null){
      console.log('Aucune institution à filtrer');
    }
    else{
      if(this.msq){
      this.val1 =1;
      }
      else{
        this.val1 =0;
      }
      this.msq = !this.msq;
      this.value1 =0;
    }
    
  }

  openModal(data){
    let texte = 'voulez-vous laisser un avis à '+data.nom +' ?';
      let obj = {ins: data, ret: texte};
      this.openMod(obj);
  }

  openMod(data) {
    let myModal = this.modalCtrl.create(NotationModalPage, data,
    {
      cssClass: 'settings-modal'
    });
    myModal.present();
  }


  openRecherche(ins){
    if(ins == null){
      console.log('Aucune institution à filtrer');
    }
    else{
      if(this.masque){
      this.value =2;
      }
      else{
        this.value =0;
      }
      this.val1 =0;
      this.masque = !this.masque;
    }
    
  }

  openMap(titre,ins,categorie){
    if(ins == null){
      console.log('Aucune institution à filtrer');
    }
    else{

      this.value =3;
      this.navCtrl.push(CarteMapPage, {
        'accueil': 'accueil',
        'titre':this.titre,
        'cat':categorie,
        'ca': 'sca'
      });
    }
    
  
  }

  goToInstitu(institution){
    this.navCtrl.push(InstitutionPage, {
      'ins': institution,
      'categorie': this.categorie.nom,
      'url': this.url
    });
  }

  goToDetailsSight(sight){
    this.navCtrl.push(DetailsSightPage, {
      'accueil': 'listeins',
      'data': sight,
      'titre':sight.nom
    });
  
  }

  filtreByNote(ins){
    if(ins == null){
      console.log('Aucune institution à filtrer');
    }
    else{
      this.valrech = 0;
       this.note =1;
      this.val1 =0;
      this.institution.sort((locationA, locationB) => {
        if(locationA.note > locationB.note) return -1;
          if(locationA.note < locationB.note) return 1;
          return 0;
        });
      console.log(this.institution);
    }
    return(this.institution);
    
  }

  getItemsFleuriste(ev) {
    this.valrech = 1;
    
    // Reset items back to all of the items
    
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.insRecherche = this.institution.filter((item) => {
        return (item.nomIns.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    if(this.insRecherche == 0 ){
      this.valueJour =0;
      this.message = 'Aucun résultat trouvé';
      console.log(this.message);
    }
    else{
      this.valueJour =1;
      this.message = '';
    }
    if (val == '' || !val){
      this.valrech = 0;
      this.insRecherche = this.institution;
    }
    console.log(this.insRecherche);
    console.log(this.institution);
    console.log(this.valrech);
  }

  getIns(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getIns().subscribe(
        data => {
            this.institutio = data; 
            console.log(this.institutio);
                if(this.institutio == 0){
                  let titre ="Pas de institution  a afficher";
                  console.log(this.institutio+' 1');

                }
                else{
                  console.log(this.institutio);
                  console.log(this.titre); 
                  for(var i = 0; i < this.institutio.length; i++)
                  {
                    if(this.institutio[i].typeins == this.titre)
                    {
                      this.institution.push(this.institutio[i]);
                    }
                  }
                  console.log(this.valrech);
                  if(this.institution == 0){
                    this.vall =0;
                    this.message1 = "Aucune institution pour la categorie "+this.titre;
                    console.log(this.message1);

                  }
                  else{
                    this.vall =1;
                    this.message1 = "";
                    console.log('this.message1');
                  }
                  console.log(this.institution);  
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

  flitreByprice(ins,price){
    this.insPrice =[];
    for(var i = 0; i < ins.length; i++)
      {
        if(ins[i].price == price)
        {
          this.insPrice.push(ins[i]);
        }
      }
      if(this.insPrice == 0 ){
      this.valueJour =0;
      this.message = 'Aucun résultat trouvé';
    }
    else{
      this.valueJour =1;
      this.message = '';
    }
    console.log(this.institution); 
    console.log(this.insPrice); 
    //this.val1 =0;
    this.valrech =2;
  }


  getInstitutionBySousCategorie(categorie){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getInstitutionBySousCategory(categorie.idSousCategory).subscribe(
        data => {
            this.institution = data.sous_category; 
            this.url = data.urls;
            console.log(this.institution);
                if(this.institution == null){
                  let titre ="Pas de categories  a afficher";
                  this.vall =0;
                  this.message1 = "Aucune institution pour la categorie "+this.titre;
                  console.log(this.message1);
                }
                else{
                  console.log(this.institution);
                  this.vall =1;
                  this.message1 = "";
                  console.log('this.message1');
                  
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
