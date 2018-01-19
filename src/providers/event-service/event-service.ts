import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LocationTrackerProvider } from '../location-tracker/location-tracker';

//const BACKEND_URL:string = 'http://localhost:8080';
const BACKEND_URL:string = 'http://192.168.1.56:8182';

/*
  Generated class for the EventServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventServiceProvider {
	categories: Array<{image: string, nom: string, id: number}>;
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});

	evenements: Array<{image: string, nom: string, id: number, date: string, lieu: string, description: string, lattitude: string, longitude: string}>;

	institutions: Array<{id: number, nom: string, adresse: string, telephone: string, image: string, lattitude: string, longitude: string, description: string}>;

  constructor(public http: Http) {
    console.log('Hello EventServiceProvider Provider');
  }

  stopTrack(){
    //this.locationTracker.stopTracking();
  }

  getVignetteIns(){
    return this.http.get('assets/data/vignette.json')
    .map((res:Response) => {
        let vignette:any = res.json();
        console.log(vignette);
        return vignette;
    });
  }

  getCategorieInteret(){
    return this.http.get('assets/data/categoriesinteret.json')
    .map((res:Response) => {
        let cat:any = res.json();
        console.log(cat);
        return cat;
    });
  }

  getCategorieDecouverte(){
    return this.http.get('assets/data/categoriedecouverte.json')
    .map((res:Response) => {
        let cat:any = res.json();
        console.log(cat);
        return cat;
    });
  }
  getCatDecouverte(){
    //return this.http.get('assets/data/categoriedecouverte.json')
    return this.http.get(BACKEND_URL+'/tagDecouverte/list_tag_decouverte', this.options)
    .map((res:Response) => {
        let cat:any = res.json();
        console.log(cat);
        return cat;
    });
  }

  getPrice(){
    return this.http.get('assets/data/price.json')
    .map((res:Response) => {
        let cat:any = res.json();
        console.log(cat);
        return cat;
    });
  }

  getRecommendations(){
    return this.http.get('assets/data/recommendations.json')
    .map((res:Response) => {
        let rec:any = res.json();
        console.log(rec);
        return rec;
    });
  }

  getRecommendation(idUser){
    return this.http.get(BACKEND_URL+'/institution/recommandation/'+idUser, this.options)
    .map((res:Response) => {
        let institution:any = res.json();
        //console.log(institution);
        return institution;
    });
  }

  getAllInstitutions(){
    return this.http.get(BACKEND_URL+'/institution/listInstitutions', this.options)
    .map((res:Response) => {
        let institution:any = res.json();
        console.log(institution);
        return institution;
    });
  }

  getClient(){
    return this.http.get('assets/data/clients.json')
    .map((res:Response) => {
        let clients:any = res.json();
        console.log(clients);
        return clients;
    });
  }

  getAvisIns(){
    return this.http.get('assets/data/avis.json')
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
  }

  getAvisUser(){
    return this.http.get('assets/data/avisuser.json')
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
  }

  getAvisByUser(idUser){
    return this.http.get(BACKEND_URL+'/note/note_by_user/'+idUser, this.options)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
  }

  getPrestatairesEnVedette(idCategory){
    return this.http.get(BACKEND_URL+'/institution/listInstitutionsbySouscategoryNote/'+idCategory, this.options)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
  }

  getCategories(){
  	//return this.http.get(BACKEND_URL+'api/categories?type=mobile')
    return this.http.get('assets/data/categories.json')
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getCategory(){
    return this.http.get(BACKEND_URL+'/category/list_category', this.options)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }


  getInstitutionByCategory(idcategorie){
    return this.http.get(BACKEND_URL+'/institution/list_institution/'+idcategorie, this.options)
    //return this.http.get('assets/data/categories.json')
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getInstitutionBySousCategory(idSousCategorie){
    return this.http.get(BACKEND_URL+'/institution/list_institution_souscategory/'+idSousCategorie, this.options)
    //return this.http.get('assets/data/categories.json')
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }
  addNoteInstitution(note){
    return this.http.post(BACKEND_URL+'/note/note',JSON.stringify(note), this.options)
    .map((res:Response) => {
      let categories:any = res.json();
      console.log(categories);
      return categories;
    });
  }

  getSousCategoryByCategory(idcategorie){
  console.log(idcategorie);
    return this.http.get(BACKEND_URL+'/sous_category/list_sous_category/'+idcategorie, this.options)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getVignetteByInstitution(idInstitution){
    return this.http.get(BACKEND_URL+'/vignette/list_vignette/'+idInstitution, this.options)
    //return this.http.get('assets/data/categories.json')
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getAvisByInsitution(idInstitution){
    return this.http.get(BACKEND_URL+'/note/list_note_by_institution/'+idInstitution, this.options)
    //return this.http.get('assets/data/avis.json')
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
  }

  getPhotoByEvent(idEvent){
    return this.http.get(BACKEND_URL+'/eventPhoto/list_event_photo_by_events/'+idEvent, this.options)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
  }

  getSousCategories(){
    //return this.http.get(BACKEND_URL+'api/categories?type=mobile')
    return this.http.get('assets/data/souscategorie.json')
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }


  getIns(){
    //return this.http.get(BACKEND_URL+'api/categories?type=mobile')
    return this.http.get('assets/data/ins.json')
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getDecouverte(){
    return this.http.get('assets/data/decouverte.json')
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getArticleDecouverte(){
    return this.http.get(BACKEND_URL+'/articles/list_articles', this.options)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }
  

  getCatPrestataires(){
    //return this.http.get(BACKEND_URL+'api/categories?type=mobile')
    return this.http.get('assets/data/categorieprestataires.json')
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getEvenements(){
  	//return this.http.get(BACKEND_URL+'api/evenements?type=mobile')
    return this.http.get('assets/data/evenements.json')
    .map((res:Response) => {
        let evenements:any = res.json();
        console.log(evenements);
        return evenements;
    });
  }

  getEvents(){
    return this.http.get(BACKEND_URL+'/event/liste_events', this.options)
    .map((res:Response) => {
        let evenements:any = res.json();
        console.log(evenements);
        return evenements;
    });
  }

  updateNblecteur(){

  }

  

  getCentreInteret(){
    /*return this.http.get(BACKEND_URL+'api/institutions/'+id'?type=mobile')
    return this.http.get('assets/data/interets.json')
    .map((res:Response) => {
        let interets:any = res.json();
        //console.log(interets);
        return interets;
    });*/

    var interets=
    [
      {id:1,nomInteret:'Night life',image:'assets/images/ICONS_NightLife2.png',photo:'assets/images/ICONS_NightLife1.png',idcat:1},
      {id:2,nomInteret:'Gastronomie',image:'assets/images/gastronomie2.png',photo:'assets/images/gastronomie2rose.png',idcat:1},
      {id:3,nomInteret:'Bien-Être',image:'assets/images/bienetre1.png',photo:'assets/images/bienetre1rose.png',idcat:1},
      {id:4,nomInteret:'Nature',image:'assets/images/ICONS_Nature2.png',photo:'assets/images/ICONS_Nature1.png',idcat:1},
      {id:5,nomInteret:'Mode',image:'assets/images/mode1.png',photo:'assets/images/mode1rose.png',idcat:1},
      {id:6,nomInteret:'Musique',image:'assets/images/ICONS_Zik2.png',photo:'assets/images/ICONS_Zik1.png',idcat:1},
      {id:7,nomInteret:'Technonologie',image:'assets/images/ICONS_Tech2.png',photo:'assets/images/ICONS_Tech1.png',idcat:1},
      {id:8,nomInteret:'Photo',image:'assets/images/ICONS_Photo2.png',photo:'assets/images/ICONS_Photo1.png',idcat:1},
      {id:9,nomInteret:'Cinéma',image:'assets/images/ICONS_Cine2.png',photo:'assets/images/ICONS_Cine1.png',idcat:1},

      {id:10,nomInteret:'Cinéma',image:'assets/images/ICONS_Cine2.png',photo:'assets/images/ICONS_Cine1.png',idcat:2},
      {id:11,nomInteret:'Bien etre',image:'assets/images/bienetre1.png',photo:'assets/images/bienetre1rose.png',idcat:2},
      {id:12,nomInteret:'Voyage',image:'assets/images/ICONS_Voyage2.png',photo:'assets/images/ICONS_Voyage1.png',idcat:2},
      {id:18,nomInteret:'Musique',image:'assets/images/ICONS_Music2.png',photo:'assets/images/ICONS_Music1.png',idcat:2},
      {id:13,nomInteret:'Technologie',image:'assets/images/ICONS_Tech2.png',photo:'assets/images/ICONS_Tech1.png',idcat:2},
      {id:14,nomInteret:'Bio',image:'assets/images/ICONS_Bio2.png',photo:'assets/images/ICONS_Bio1.png',idcat:2},
      {id:15,nomInteret:'Lecture',image:'assets/images/ICONS_Read2.png',photo:'assets/images/ICONS_Read1.png',idcat:2},
      {id:16,nomInteret:'Langages',image:'assets/images/ICONS_Language2.png',photo:'assets/images/ICONS_Language1.png',idcat:2},
      {id:17,nomInteret:'Animaux',image:'assets/images/ICONS_Animals2.png',photo:'assets/images/ICONS_Animals1.png',idcat:2},

      {id:19,nomInteret:'Tatouages',image:'assets/images/ICONS_Tatoo2.png',photo:'assets/images/ICONS_Tatoo1.png',idcat:3},
      {id:20,nomInteret:'Expositions',image:'assets/images/ICONS_Expo2.png',photo:'assets/images/ICONS_Expo1.png',idcat:3},
      {id:21,nomInteret:'Street Arts',image:'assets/images/ICONS_Voyage2.png',photo:'assets/images/ICONS_Voyage1.png',idcat:3},
      {id:22,nomInteret:'Théâtre',image:'assets/images/ICONS_Drama2.png',photo:'assets/images/ICONS_Drama1.png',idcat:3},
      {id:23,nomInteret:'Équitation',image:'assets/images/ICONS_Tech2.png',photo:'assets/images/ICONS_Tech1.png',idcat:3},
      {id:24,nomInteret:'Jeux Vidéos',image:'assets/images/ICONS_Game2.png',photo:'assets/images/ICONS_Game1.png',idcat:3},
      {id:25,nomInteret:'Lecture',image:'assets/images/ICONS_Read2.png',photo:'assets/images/ICONS_Read1.png',idcat:3},
      {id:26,nomInteret:'Œuvres caritatives',image:'assets/images/ICONS_Language2.png',photo:'assets/images/ICONS_Language1.png',idcat:3},
      {id:27,nomInteret:'Jardinage',image:'assets/images/ICONS_Garden2.png',photo:'assets/images/ICONS_Garden1.png',idcat:3}

    ];
    console.log(interets);
    return interets
  }

  getNotes(){
    return this.http.get('assets/data/notes.json')
    .map((res:Response) => {
        let notes:any = res.json();
        console.log(notes);
        return notes;
    });
  }

  getPrestataires(){
    return this.http.get('assets/data/prestataires.json')
    .map((res:Response) => {
        let notes:any = res.json();
        console.log(notes);
        return notes;
    });
  }

}
