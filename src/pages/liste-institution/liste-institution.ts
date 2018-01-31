import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Alert,IonicApp,LoadingController, ViewController,App, Events, ModalController, ToastController } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { CarteMapPage } from '../carte-map/carte-map';
import { ListeBusinessPage } from '../liste-business/liste-business';
import { InstitutionPage } from '../institution/institution';
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';
import { DetailsDecouvertePage } from '../details-decouverte/details-decouverte';
import {OrderByPipe} from "../../app/orderby.pipe"
import {RateComponent} from '../../components/rate/rate';
import { RechercheDecouvertePage } from '../recherche-decouverte/recherche-decouverte';
import { DetailsSightPage } from '../details-sight/details-sight';
import { Toast } from '@ionic-native/toast';
//private toast : Toast,

//declare _ : any;
declare var _;

/**
 * Generated class for the ListeInstitutionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-institution',
  templateUrl: 'liste-institution.html',
})
export class ListeInstitutionPage {
	institution: any;
  insWeb: any;
  institutio: any;
  insti: any;
	categorie: any;
	shopping: any;
	titre: any;
	nightlife: any;
	shops:  any;
  mode: any;
  masque: any;
  val: any
  value: any;
  interests: any;
  color: any;
  catprestaiares: any;
  vignette: any;
  prestataires: any;
  bienEtre: any;
  prix: any;
  ins: any;
  valPrix: any;
  uniqueStandards: any;
  map: any;
  titleCat: any;
  insRecherche: any;
  valrech: any;
  msq: any;
  val1 : any;
  value1: any;
  price1 : any;
  rech: any;
  insPrice:any;
  rec: any;
  nota: any;
  pr: any;
  message : any;
  message1 : any;
  valueJour: any;
  vall: any;
  titre1: any;
  souscat: any;
  top: any;
  note: any;
  catDecouverte: any;
  articpop : any;
  height: any;
  scat1: any;
  sCat:any;
  ca: any;
  url: any;
  PrePopulaires: any;
  inss: any;
  instii: any;
  urll: any;


  constructor( private toast : Toast, public navCtrl: NavController, public navParams: NavParams ,private alertCtrl: AlertController,private eventService:EventServiceProvider, public loading: LoadingController,public viewCtrl: ViewController, public connectivityService:ConnectvityServiceProvider,private modalCtrl: ModalController, private toastCtrl: ToastController) {
    this.masque =false;
    this.val =0;
    this.msq = false;
    this.val1 =0;
    this.value =0;
    this.value1 =0;
    this.ins =[];
    this.insti =[];
    this.institution =[];
    this.insRecherche = [];
    this.insPrice = [];
    this.valPrix =0;
    this.map = 0;
    this.valrech = 0;
    this.rech = 0;
    this.rec = 0;
    this.nota = 0;
    this.pr = 0;
    this.valueJour =1;
    this.vall = 1;
    this.articpop = 1;
    this.top = '65px';
    this.note =0;
    this.height = '170px';
    this.price1 =
    [
      {"id":"1","price":"$"},
      {"id":"1","price":"$$"},
      {"id":"1","price":"$$$"},
      {"id":"1","price":"$$$$"}
    ];
  	if(navParams.get("data") !== "undefined" )
    {
      this.categorie = navParams.get("data");
      this.titre = navParams.get("titre");
      this.titre1 = navParams.get("titre1");
      this.urll = navParams.get("urlsc");
      this.souscat = navParams.get("souscat");
      this.scat1 = navParams.get("scat");
      console.log(this.urll);
      console.log(this.souscat);
      this.titleCat = this.titre;
      console.log(this.categorie);
      console.log(this.titre);
      console.log(this.titre1);
      
      console.log(this.scat1);
    }
    if(this.souscat != null){
      if(this.souscat.length == 3){
        this.height = '200px';
        this.top = '80px';
        console.log(this.top);
      }
    }
   
    if(this.titre== 'Découverte'){
      this.map = 1;
      this.nota = 1;
      this.pr = 1;
      this.rec =1;
    }

    if(this.titre== 'Things To Do'){
      this.map = 1;
      this.nota = 1;
      this.pr = 1;
      this.rec = 1;
    }

    if(this.titre== 'Shopping'){
      this.map = 1;
      this.nota = 1;
      this.pr = 1;
      this.rec = 1;
    }

    if(this.titre== 'Prestataires'){
      this.map = 1;
      this.nota = 1;
      this.pr = 0;
      this.rec = 1;
    }

    if(this.titre== 'Night Life' || this.titre == 'Mode et Beauté' || this.titre == 'Bien-être' || this.titre == 'Restaurants')
    {
      this.rech = 1;
    }

  }

  showAddressModal () {
    //console.log('petit dej');
    let inst = {'institution': this.institution,'cat': this.catDecouverte};

    let modal = this.modalCtrl.create(RechercheDecouvertePage, inst);
    let me = this;
    modal.onDidDismiss(data => {
      console.log(data);
      if (data == '' || !data){
        console.log("Nous n'avons rien trouve");
        this.presentToast("Aucun résultat trouvé");
        this.showToast("Aucun résultat trouvé");
      }
      else{
        console.log(this.titre1);
        this.insRecherche = data;
        console.log(this.insRecherche);
        this.articpop = 0;
        this.valrech =1;
      }
      
    });
    modal.present();
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

  getCatDecouverte(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getCatDecouverte().subscribe(
        data => {
            this.catDecouverte = data.notes; 
            console.log(this.catDecouverte);
                if(this.catDecouverte == null){
                  let titre ="Pas de catDecouverte  a afficher";
                  console.log(this.catDecouverte+' 1');

                }
                else{
                  console.log(this.catDecouverte);  
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

  afficherMenu(ins){
    if(ins == null){
      console.log('Aucune institution à filtrer');
    }
    else{
      if(this.msq){
      this.val1 =1;
      //this.top="-40px"
      }
      else{
        this.val1 =0;
        //this.top="0px"
      }
      this.msq = !this.msq;
      this.value1 =0;
      console.log(this.val1);
      this.value =0;
    }
    
  }

  flitreByprice(ins,price){
    this.insPrice =[];
    for(var i = 0; i < ins.length; i++)
    {
        if(ins[i].price == price)
        {
          //this.institution.push(ins[i]);
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

  filtreByNote(ins){
    if(ins == null){
      console.log('Aucune institution à filtrer');
    }
    else{
      this.valrech = 3;
      this.note =1;
      this.val1 =0;
      this.institution.sort((locationA, locationB) => {
        if(locationA.note > locationB.note) return -1;
          if(locationA.note < locationB.note) return 1;
          return 0;
        });
      console.log(this.valrech); 
      console.log(this.institution);  
    }
      
    return(this.institution);
    
  }

  getItemsRestau(ev) {
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
    }
    else{
      this.valueJour =1;
      this.message = '';
    }
    if (val == '' || !val){
      this.valrech = 0;
      //this.valueJour =0;
      this.insRecherche = this.institution;
    }
    console.log(this.insRecherche);
    console.log(this.institution);
    console.log(this.valrech);
  }

  getItemsDecouverte(ev) {
    this.valrech = 1;
    
    // Reset items back to all of the items
    
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.insRecherche = this.institution.filter((item) => {
        return (item.tag.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    if (val == '' || !val){
      this.valrech = 0;
      this.insRecherche = this.institution;
    }
    console.log(this.insRecherche);
    console.log(this.institution);
    console.log(this.valrech);
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'center').subscribe(
      toast => {
        //console.log(toast);
      }
    );
  }

  ionViewDidLoad() {
    //this.connectivityService.checkNetwork();
    console.log('ionViewDidLoad ListeInstitutionPage');
    this.connectivityService.checkNetwork();
    
    
    
    if(this.titre == 'Prestataires'){
      this.getVignetteIns();
      this.getInstitutionByCategorie(this.categorie);
      //this.getPrestataires();
      //this.getPrestatairesEnVedette(this.categorie);
      this.color = '#ffffff';
    }
    
    else if(this.titre == 'Découverte'){
      this.getArticleDecouverte();
      this.getCatDecouverte();
    }
    else{
      this.getInstitutionByCategorie(this.categorie);
    }
  }

  openMap(titre,ins,categorie){
    if(ins == null){
      console.log('Aucune institution à visulaiser');
    }
    else{
      this.value =3;
      this.navCtrl.push(CarteMapPage, {
      'accueil': 'accueil',
      'titre':titre,
      'cat':categorie,
      'ca': 'ca',
      'url': this.url
    });
    }
  }

  goToListeBusiness(categorie){
    this.navCtrl.push(ListeBusinessPage, {
      'accueil': 'listeins',
      'data': categorie,
      'titre':categorie.nomSousCategory,
      'titleCat': this.titleCat
    });
    console.log(categorie.nomSousCategory);
  }

  goToListeBus(categorie){
    this.navCtrl.push(ListeBusinessPage, {
      'accueil': 'listeins',
      'data': categorie,
      'titre':categorie.nomSousCategory,
      'titleCat': this.titleCat
    });
  }

  goToDetailsDecouverte(decouverte){
    this.navCtrl.push(DetailsDecouvertePage, {
      'accueil': 'listeins',
      'data': decouverte,
      'titre':decouverte.titreArticle
    });
  
  }

  goToDetailsSight(sight){
    this.navCtrl.push(DetailsSightPage, {
      'accueil': 'listeins',
      'data': sight,
      'titre':sight.nom
    });
  
  }

  openPrix(ins){
    if(ins == null){
      console.log('Aucune institution à filtrer');
    }
    else{
      if(this.masque){
        this.value =1;
      }
      else{
        this.value =0;
      }
    this.masque = !this.masque;
    }
    
  }

  openRecherche(ins){
    if(ins == null){
      console.log('Aucune institution à rechercher');
    }
    else{
      if(this.masque){
      //code css 
      this.value =2;
      this.top = '-40px';
      }
      else{
        //code css
        this.value =0;
        this.top = '0px';
      }
      this.val1 =0;
      this.masque = !this.masque;
      console.log(this.top);
    }
    
  }

  /*getRestoByPrix(restau){
    this.valPrix =1;
    for(var i = 0; i < restau.length; i++){
      if(restau[i].prixmax <= this.prix){
        this.ins.push(restau[i]);
        console.log(restau[i]);
      }
    }
    this.uniqueStandards = this.arrUnique(this.ins);
    console.log(this.uniqueStandards);
    console.log(this.institution);
    console.log(this.prix);
  }

  arrUnique(arr) {
    var cleaned = [];
    this.ins.forEach(function(itm) {
        var unique = true;
        cleaned.forEach(function(itm2) {
            if (_.isEqual(itm, itm2)) unique = false;
        });
        if (unique)  cleaned.push(itm);
    });
    return cleaned;
  }*/

  goToInstitu(institution){
    this.navCtrl.push(InstitutionPage, {
      'ins': institution,
      'categorie': this.categorie.nom,
      'url': this.url
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
            this.url = data.urls;
            console.log(this.institution);
            console.log(this.url);
                if(this.institution == null){
                  let titre ="Pas de institution  a afficher";
                  console.log(this.institution+' 1');
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

  getPrestatairesEnVedette(categorie){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getPrestatairesEnVedette(categorie.idCategory).subscribe(
        data => {
            this.inss = data.institution; 
            this.url = data.urls;
            console.log(this.inss);
            console.log(this.url);
                if(!this.inss){
                  let titre ="Pas d'institution en vedette à afficher";
                  this.vall =0;
                  this.message1 = "Pas d'institution en vedette à afficher";
                  console.log(this.message1);
                  
                }
                else{
                  console.log(this.inss);
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


  getArticleDecouverte(){
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.eventService.getArticleDecouverte().subscribe(
        data => {
            this.institution = data.article; 
            console.log(this.institution);
                if(this.institution == 0){
                  let titre ="Pas de Decouverte  a afficher";
                  console.log(this.institution+' 1');
                  this.vall =0;
                  this.message1 = "Aucune institution pour la categorie "+this.titre;
                  console.log(this.message1);

                }
                else{
                 
                  console.log(this.institution);
                  this.vall =1;
                  
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
