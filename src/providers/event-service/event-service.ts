import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {StorageUtils} from '../../Utils/storage.utils';
import { CacheService } from "ionic-cache";
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';

//const BACKEND_URL:string = 'http://localhost:8080';
<<<<<<< HEAD
const BACKEND_URL:string = 'http://213.246.59.111:8080/LIVINDKR_API4';
//const BACKEND_URL:string = 'http://192.168.1.94:8088';
=======
const BACKEND_URL:string = 'http://213.246.59.111:8080/LIVINDKR_API5';
//const BACKEND_URL:string = 'http://192.168.1.94:8088';
//const BACKEND_URL:string = 'http://192.168.1.130:8181';
>>>>>>> 41d8e9b61ca5a5632bc61eb8c767a88c45cb0f9d

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
  insKey = 'ins-key-group';
  data: Promise<any> = null;

	evenements: Array<{image: string, nom: string, id: number, date: string, lieu: string, description: string, lattitude: string, longitude: string}>;

	institutions: Array<{id: number, nom: string, adresse: string, telephone: string, image: string, lattitude: string, longitude: string, description: string}>;

  constructor(public connectivityService:ConnectvityServiceProvider, public http: Http,public cache: CacheService) {
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
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/institution/recommandation/';
    request = this.http.get(BACKEND_URL+'/institution/recommandation/', this.options)
      .timeout(50000)
      .map((res:Response) => {
        let institution:any = res.json();
        return institution;
    });

    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
      //return request;
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
    
  }

  getAllInstitutions(){
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/institution/listInstitutions';
    request = this.http.get(BACKEND_URL+'/institution/listInstitutions', this.options)
      .timeout(50000)
      .map((res:Response) => {
          let institution:any = res.json();
          console.log(institution);
          return institution;
      });

    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
    
  }

 

  getAvisByUser(){
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/note/note_by_user/';
    request = this.http.get(BACKEND_URL+'/note/note_by_user/', this.options)
      .timeout(50000)
      .map((res:Response) => {
          let avis:any = res.json();
          console.log(avis);
          return avis;
      });

    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
    
  }

  getPrestatairesEnVedette(idCategory){
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/institution/listInstitutionsbySouscategoryNote/'+idCategory;
    request = this.http.get(BACKEND_URL+'/institution/listInstitutionsbySouscategoryNote/'+idCategory, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });

    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
  }

  

  getCategory(){
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/category/list_category';
    request = this.http.get(BACKEND_URL+'/category/list_category', this.options)
    .timeout(50000)
    .map((res:Response) => {
      let categories:any = res.json();
      console.log(categories);
      return categories;
    });

    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
    
    
  }


  getInstitutionByCategory(idcategorie){
    let request, cacheKey, categories;
    cacheKey = BACKEND_URL+'/institution/list_institution/'+idcategorie;
    request = this.http.get(BACKEND_URL+'/institution/list_institution/'+idcategorie, this.options)
    .timeout(50000)
    .map((res:Response) => {
        categories = res.json();
        console.log(categories);
        return categories;
    });

    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      //return request;
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
    
  }

  getInstitutionBySousCategory(idSousCategorie){
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/institution/list_institution_souscategory/'+idSousCategorie;
    request = this.http.get(BACKEND_URL+'/institution/list_institution_souscategory/'+idSousCategorie, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });

    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    } 
   
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

  updateNoteInstitution(note){
    return this.http.put(BACKEND_URL+'/note/update_note/'+note.idNote+'/'+note.note+'/'+note.avis+'/', note, this.options)
    .timeout(50000)
    .map((res:Response) => {
      let categories:any = res.json();
      console.log(categories);
      return categories;
    });
  }

 

  getVignetteByInstitution(idInstitution){
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/vignette/list_vignette/'+idInstitution;
    request = this.http.get(BACKEND_URL+'/vignette/list_vignette/'+idInstitution, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });

    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
  }

  getAvisByInsitution(idInstitution){
    let request = this.http.get(BACKEND_URL+'/note/list_note_by_institution/'+idInstitution, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
    let cacheKey = BACKEND_URL+'/note/list_note_by_institution/'+idInstitution;
    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
    
  }

  getPhotoByEvent(idEvent){
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/eventPhoto/list_event_photo_by_events/'+idEvent;
    request = this.http.get(BACKEND_URL+'/eventPhoto/list_event_photo_by_events/'+idEvent, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }  
    
  }

  getMenuByInstitution(institution){
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/institutionMenu/menuInst/'+institution.idInstitution;
    request = this.http.get(BACKEND_URL+'/institutionMenu/menuInst/'+institution.idInstitution, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let avis:any = res.json();
        console.log(avis);
        return avis;
    });
    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }  
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
    let request,cacheKey;
    cacheKey = BACKEND_URL+'/articles/list_articles';
    request = this.http.get(BACKEND_URL+'/articles/list_articles', this.options)
    .timeout(50000)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
    
    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
    
  }

  getCatDecouverte(){
    let request,cacheKey;
    cacheKey = BACKEND_URL+'/tagDecouverte/list_tag_decouverte';
    request = this.http.get(BACKEND_URL+'/tagDecouverte/list_tag_decouverte', this.options)
    .timeout(50000)
    .map((res:Response) => {
        let cat:any = res.json();
        console.log(cat);
        return cat;
    });

    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
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
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/event/liste_events';
    request = this.http.get(BACKEND_URL+'/event/liste_events', this.options)
    .timeout(50000)
    .map((res:Response) => {
      let evenements:any = res.json();
      console.log(evenements);
      return evenements;
    });
    let ttl =10;
    
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("hors ligne ");
      
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
    }
  }

   getSousCategoryByCategory(idcategorie){
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/sous_category/list_sous_category/'+idcategorie;
    request = this.http.get(BACKEND_URL+'/sous_category/list_sous_category/'+idcategorie, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let categories:any = res.json();
        console.log(categories);
        return categories;
    });
    let ttl =10;
    if(this.connectivityService.isOnline()){
      //this.cache.clearGroup(this.insKey);
      console.log("En ligne");
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(cacheKey, request, this.insKey, ttl, delayType);
    }
    else{
      console.log("Hors ligne");
      return this.cache.loadFromObservable(cacheKey, request, this.insKey, ttl);
      
    }
  }

  updateNblecteur(article){
    return this.http.put(BACKEND_URL+'/articles/increments_articles/'+article.idArticle, article, this.options)
    .timeout(50000)
    .map((res:Response) => {
      let categories:any = res.json();
      console.log(categories);
      return categories;
    });

  }
  
}
