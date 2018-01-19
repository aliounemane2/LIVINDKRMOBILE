import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../../Classes/user';
import {StorageUtils} from '../../Utils/storage.utils';
import { Observable } from 'rxjs';

const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
//const BACKEND_URL:string = 'http://aims.avanquest.com/restau-prive/web/app_dev.php/api/login';
const BACKEND_URL:string = 'http://192.168.1.56:8182';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  infosUser: Array<{nom: string, prenom: string, id: number, email: string, username: string, telephone: string}>;
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});

  constructor(public http: Http) {
    console.log('Hello UserServiceProvider Provider');
    /*let headers = new Headers();
    let options = new RequestOptions({
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' +StorageUtils.getToken()
      })
    });*/
  }

  loginJson(){
    return this.http.get('assets/data/users.json')
    .map((res:Response) => {
        let users:any = res.json();
        console.log(users);
        return users;
    });
  }

  dologin(username:string,password:string){
    return this.http.post(BACKEND_URL+"/login",{pseudo: username, password: password}, this.options).map((res:Response) => {
        let user:any = res.json();
        //console.log(user);
        return user;
    });
  }

  createUser(user) {
    return this.http.post(BACKEND_URL+'/users/inscription_user', JSON.stringify(user), this.options)
    .map((res:Response) => {
      let userr:any = res.json();
      console.log(userr);
      return userr;
    });
  }

  private extractData(res: Response) {
      let body = res.json();
      console.log(body);
        return body;
    }
    private handleError (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.status);
    }


  editUser(user){
    return this.http.post(BACKEND_URL+'api/login?', JSON.stringify(user), this.options).map((res:Response) => {
        let user:any = res.json();
        
        //console.log(user);
        return user;
    });
  }

  getLinkPhoto(){
    return BACKEND_URL;
  }
  editPhotoProfil(idUser,photo){
    let headers = new Headers();
    let options = new RequestOptions({
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' +StorageUtils.getToken()
      })
    });
    return this.http.get(BACKEND_URL+'api/edituser?type=mobile&photo='+photo, options).map((res:Response) => {

        let user:any = res.json();
        
        //console.log(user);
        return user;
    });
  }

  getInfoUser(){
    /*let options = new RequestOptions({
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' +StorageUtils.getToken()
      })
    });
    return this.http.get(BACKEND_URL+'api/profil/tableau?type=mobile', options).map((res:Response)=> {
        let user:any = res.json();
        //console.log(user);
        return user;
    });*/
    this.infosUser=
    [
      {nom: 'NIASS', prenom: 'Amadou', id: 1, email: 'amadouniass8@gmail.com', username: 'douma', telephone: '775205028'}
    ];
    return this.infosUser;
  }

  validateCode(user,idUser,code){
    return this.http.post(BACKEND_URL+'/users/validation_code/'+idUser+'/'+code, JSON.stringify(user), this.options)
    .map((res:Response) => {
        let user:any = res.json();
        //console.log(user);
        return user;
    });

  }

  getInterest(){
    return this.http.get(BACKEND_URL+'/interests/list_interests')
    .map((res:Response) => {
        let interest:any = res.json();
        //console.log(interest);
        return interest;
    });

  }

  

  addInterestUser(interest,idUser){
    return this.http.post(BACKEND_URL+'/users/inscription_interest/'+idUser, JSON.stringify(interest), this.options)
    .map((res:Response) => {
      let user: any = res.json();
      console.log(user);
      return user;
    });
  
  }

  public readJwt(token:string):User {
        let tokens:Array<any> = token.split('.');
        let tokenPayload:any = JSON.parse(atob(tokens[1]));
        //console.log(tokenPayload);

        let user:User = new User();
        user.lastConnection = new Date();
        user.id = parseInt(tokenPayload.iss);
        user.email = tokenPayload.sub;
        user.firstName = tokenPayload.firstName;
        user.lastName = tokenPayload.lastName;
        user.roles = tokenPayload.role;

        return user;
    }

}
