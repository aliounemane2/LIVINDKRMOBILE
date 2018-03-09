import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {StorageUtils} from '../../Utils/storage.utils';
import { CacheService } from "ionic-cache";
import { ConnectvityServiceProvider } from '../../providers/connectvity-service/connectvity-service';

//const BACKEND_URL:string = 'http://localhost:8080';
const BACKEND_URL:string = 'http://213.246.59.111:8080/LIVINDKR6';
//const BACKEND_URL:string = 'http://192.168.1.94:8088';
//const BACKEND_URL:string = 'http://192.168.1.130:8181';

/*
  Generated class for the EventServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventServiceProvider {
  categories: Array<{image: string, nom: string, id: number}>;
 
  /*private headers = new Headers({'Content-Type': 'application/json',
        'Authorization': StorageUtils.getToken()});
  private options = new RequestOptions({headers: this.headers});

  private headers1 = new Headers({'Content-Type': 'application/json'});
  private options1 = new RequestOptions({headers: this.headers1});*/
  insKey = 'ins-key-group';
  data: Promise<any> = null;

	evenements: Array<{image: string, nom: string, id: number, date: string, lieu: string, description: string, lattitude: string, longitude: string}>;

	institutions: Array<{id: number, nom: string, adresse: string, telephone: string, image: string, lattitude: string, longitude: string, description: string}>;

  constructor(public connectivityService:ConnectvityServiceProvider, public http: Http,public cache: CacheService) {
    console.log('Hello EventServiceProvider Provider');
    console.log(StorageUtils.getToken());
    
  }

  getVignetteIns(){
    return this.http.get('assets/data/vignette.json')
    .map((res:Response) => {
        let vignette:any = res.json();
        console.log(vignette);
        return vignette;
    });
  }

  dologin(username:string,password:string){
    let headers1 = new Headers({'Content-Type': 'application/json'});
    let options1 = new RequestOptions({headers: headers1});
    return this.http.post(BACKEND_URL+"/login?pseudo="+username+"&password="+password, options1)
    .timeout(50000)
    .map((res:Response) => {
        let user:any = res.json();
        return user;
    });
  }

  



  getRecommendation(){
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/institution/recommandation/';
    request = this.http.get(BACKEND_URL+'/institution/recommandation/', options)
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

  getPublicite(){
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/publicite/listPubliciteByAccueil';
    request = this.http.get(BACKEND_URL+'/publicite/listPubliciteByAccueil', options)
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

  getPublicitePrestaires(){
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/publicite/listPubliciteByCarroussel';
    request = this.http.get(BACKEND_URL+'/publicite/listPubliciteByCarroussel', options)
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

  getPubliciteArticle(){
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/publicite/listPubliciteByArticle';
    request = this.http.get(BACKEND_URL+'/publicite/listPubliciteByArticle', options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/institution/listInstitutions';
    request = this.http.get(BACKEND_URL+'/institution/listInstitutions', options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/note/note_by_user/';
    request = this.http.get(BACKEND_URL+'/note/note_by_user/', options)
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

  getInfoUser(){
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/users/getuser';
    
    request = this.http.get(BACKEND_URL+'/users/getuser', options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/institution/listInstitutionsbySouscategoryNote/'+idCategory;
    request = this.http.get(BACKEND_URL+'/institution/listInstitutionsbySouscategoryNote/'+idCategory, options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/category/list_category';
    request = this.http.get(BACKEND_URL+'/category/list_category', options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey, categories;
    cacheKey = BACKEND_URL+'/institution/list_institution/'+idcategorie;
    request = this.http.get(BACKEND_URL+'/institution/list_institution/'+idcategorie, options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/institution/list_institution_souscategory/'+idSousCategorie;
    request = this.http.get(BACKEND_URL+'/institution/list_institution_souscategory/'+idSousCategorie, options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    return this.http.post(BACKEND_URL+'/note/note',JSON.stringify(note), options)
    .timeout(50000)
    .map((res:Response) => {
      let categories:any = res.json();
      console.log(categories);
      return categories;
    });
  }

  updateNoteInstitution(note){
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    return this.http.put(BACKEND_URL+'/note/update_note/'+note.idNote+'/'+note.note+'/'+note.avis+'/', note, options)
    .timeout(50000)
    .map((res:Response) => {
      let categories:any = res.json();
      console.log(categories);
      return categories;
    });
  }

 

  getVignetteByInstitution(idInstitution){
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/vignette/list_vignette/'+idInstitution;
    request = this.http.get(BACKEND_URL+'/vignette/list_vignette/'+idInstitution, options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request = this.http.get(BACKEND_URL+'/note/list_note_by_institution/'+idInstitution, options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/eventPhoto/list_event_photo_by_events/'+idEvent;
    request = this.http.get(BACKEND_URL+'/eventPhoto/list_event_photo_by_events/'+idEvent, options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/institutionMenu/menuInst/'+institution.idInstitution;
    request = this.http.get(BACKEND_URL+'/institutionMenu/menuInst/'+institution.idInstitution, options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request,cacheKey;
    cacheKey = BACKEND_URL+'/articles/list_articles';
    request = this.http.get(BACKEND_URL+'/articles/list_articles', options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request,cacheKey;
    cacheKey = BACKEND_URL+'/tagDecouverte/list_tag_decouverte';
    request = this.http.get(BACKEND_URL+'/tagDecouverte/list_tag_decouverte', options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/event/liste_events';
    request = this.http.get(BACKEND_URL+'/event/liste_events', options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    let request, cacheKey;
    cacheKey = BACKEND_URL+'/sous_category/list_sous_category/'+idcategorie;
    request = this.http.get(BACKEND_URL+'/sous_category/list_sous_category/'+idcategorie, options)
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
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization': StorageUtils.getToken()});
    let options = new RequestOptions({headers: headers});
    return this.http.put(BACKEND_URL+'/articles/increments_articles/'+article.idArticle, article, options)
    .timeout(50000)
    .map((res:Response) => {
      let categories:any = res.json();
      console.log(categories);
      return categories;
    });

  }
  
}
