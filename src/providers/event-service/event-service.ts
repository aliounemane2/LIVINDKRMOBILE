import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {StorageUtils} from '../../Utils/storage.utils';

//const BACKEND_URL:string = 'http://localhost:8080';
const BACKEND_URL:string = 'http://213.246.59.111:8080/LIVINDKR_API4';
//const BACKEND_URL:string = 'http://192.168.1.94:8088';

/*
  Generated class for the EventServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventServiceProvider {
	categories: Array<{image: string, nom: string, id: number}>;
  private headers = new Headers({'Content-Type': 'application/json',
        'Authorization': StorageUtils.getToken()});
  private options = new RequestOptions({headers: this.headers});

	evenements: Array<{image: string, nom: string, id: number, date: string, lieu: string, description: string, lattitude: string, longitude: string}>;

	institutions: Array<{id: number, nom: string, adresse: string, telephone: string, image: string, lattitude: string, longitude: string, description: string}>;

  constructor(public http: Http) {
    console.log('Hello EventServiceProvider Provider');
  }

  getVignetteIns(){
    return this.http.get('assets/data/vignette.json')
    .map((res:Response) => {
        let vignette:any = res.json();
        console.log(vignette);
        return vignette;
    });
  }

  



  getRecommendation(){
    return this.http.get(BACKEND_URL+'/institution/recommandation/', this.options)
    .timeout(50000)
    .map((res:Response) => {
        let institution:any = res.json();
        //console.log(institution);
        return institution;
    });
  }

  getAllInstitutions(){
    return this.http.get(BACKEND_URL+'/institution/listInstitutions', this.options)
    .timeout(50000)
    .map((res:Response) => {
        let institution:any = res.json();
        console.log(institution);
        return institution;
    });
  }

 

  getAvisByUser(){
    return this.http.get(BACKEND_URL+'/note/note_by_user/', this.options)
    .timeout(50000)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
  }

  getPrestatairesEnVedette(idCategory){
    return this.http.get(BACKEND_URL+'/institution/listInstitutionsbySouscategoryNote/'+idCategory, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
  }

  

  getCategory(){
    return this.http.get(BACKEND_URL+'/category/list_category', this.options)
    .timeout(50000)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }


  getInstitutionByCategory(idcategorie){
    return this.http.get(BACKEND_URL+'/institution/list_institution/'+idcategorie, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getInstitutionBySousCategory(idSousCategorie){
    return this.http.get(BACKEND_URL+'/institution/list_institution_souscategory/'+idSousCategorie, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }
  addNoteInstitution(note){
    return this.http.post(BACKEND_URL+'/note/note',JSON.stringify(note), this.options)
    .timeout(50000)
    .map((res:Response) => {
      let categories:any = res.json();
      console.log(categories);
      return categories;
    });
  }

  getSousCategoryByCategory(idcategorie){
  console.log(idcategorie);
    return this.http.get(BACKEND_URL+'/sous_category/list_sous_category/'+idcategorie, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getVignetteByInstitution(idInstitution){
    return this.http.get(BACKEND_URL+'/vignette/list_vignette/'+idInstitution, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getAvisByInsitution(idInstitution){
    return this.http.get(BACKEND_URL+'/note/list_note_by_institution/'+idInstitution, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
  }

  getPhotoByEvent(idEvent){
    return this.http.get(BACKEND_URL+'/eventPhoto/list_event_photo_by_events/'+idEvent, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
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

  getArticleDecouverte(){
    return this.http.get(BACKEND_URL+'/articles/list_articles', this.options)
    .timeout(50000)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
  }

  getCatDecouverte(){
    return this.http.get(BACKEND_URL+'/tagDecouverte/list_tag_decouverte', this.options)
    .timeout(50000)
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

  getEvents(){
    return this.http.get(BACKEND_URL+'/event/liste_events', this.options)
    .timeout(50000)
    .map((res:Response) => {
        let evenements:any = res.json();
        console.log(evenements);
        return evenements;
    });
  }

  updateNblecteur(){

  }
  
}
