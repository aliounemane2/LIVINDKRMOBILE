import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../../Classes/user';
import {StorageUtils} from '../../Utils/storage.utils';
import { Observable } from 'rxjs';

//const CONTENT_TYPE_HEADER:string = 'Content-Type';
//const APPLICATION_JSON:string = 'application/json';
const BACKEND_URL:string = 'http://213.246.59.111:8080/LIVINDKR_API4';
//const BACKEND_URL:string = 'http://192.168.1.94:8088';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  infosUser: Array<{nom: string, prenom: string, id: number, email: string, username: string, telephone: string}>;
  private headers = new Headers({'Content-Type': 'application/json'});
  private headers1 = new Headers({'Content-Type': 'application/json','Authorization': StorageUtils.getToken()});
  private headers2 = new Headers({'Content-Type': 'application/json;odata=verbose'});
  private options = new RequestOptions({headers: this.headers});
  private options1 = new RequestOptions({headers: this.headers1});
  private options2 = new RequestOptions({headers: this.headers2});
  public url = "http://213.246.59.111:8080/LIVINDKR_API4";
  file: File;
  

  constructor(public http: Http) {
    console.log('Hello UserServiceProvider Provider');
    
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
    return this.http.post(BACKEND_URL+"/login?pseudo="+username+"&password="+password, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let user:any = res.json();
        return user;
    });
  }

  createUser(file,user) {
    this.file = file;
    const userBlob = new Blob([JSON.stringify(user)],{ type: "application/json"});
    
    let formData: FormData = new FormData();
    formData.append('file', this.file);
    formData.append('user',userBlob);

    return this.http.post(BACKEND_URL+'/inscription', formData)
    .timeout(50000)
    .map((res:Response) => {
      let userr:any = res.json();
      console.log(userr);
      return userr;
    });
  }

  editUser(user){
    return this.http.post(BACKEND_URL+'api/login?', JSON.stringify(user), this.options1)
    .timeout(50000)
    .map((res:Response) => {
        let user:any = res.json();
        
        //console.log(user);
        return user;
    });
  }

  getLinkPhoto(){
    return BACKEND_URL;
  }
  editPhotoProfil(photo){
    return this.http.post(BACKEND_URL+'/modify_image/edituser'+photo, this.options1)
    .timeout(50000)
    .map((res:Response) => {
        let user:any = res.json();   
        //console.log(user);
        return user;
    });
  }

  getInfoUser(){
    
    return this.http.get(BACKEND_URL+'/users/getuser', this.options1)
    .timeout(50000)
    .map((res:Response)=> {
        let user:any = res.json();
        //console.log(user);
        return user;
    });
  }

  validateCode(code){
    return this.http.post(BACKEND_URL+'/ConfirmationEmail?code='+code, this.options)
    .timeout(50000)
    .map((res:Response) => {
        let user:any = res.json();
        //console.log(user);
        return user;
    });

  }

  getInterest(){
    return this.http.get(BACKEND_URL+'/interests/list_interests', this.options)
    .timeout(50000)
    .map((res:Response) => {
        let interest:any = res.json();
        //console.log(interest);
        return interest;
    });

  }

  

  addInterestUser(interest,idUser){
    return this.http.post(BACKEND_URL+'/users/inscription_interest/'+idUser, JSON.stringify(interest),this.options)
    .timeout(50000)
    .map((res:Response) => {
      let user: any = res.json();
      console.log(user);
      return user;
    });
  
  }

  public readJwt(token:string):User {
        let tokenss:Array<any> = token.split(' ');
        let tokens:any = tokenss[1];
        let toke:Array<any> = tokens.split('.');
        let tokenPayload:any = JSON.parse(atob(toke[1]));
        console.log(tokenPayload);

        let user:User = new User();
        user.expireTime = tokenPayload.exp;
        user.lastConnection = new Date();
        user.id = parseInt(tokenPayload.iss);
        user.email = tokenPayload.sub;
        user.firstName = tokenPayload.firstName;
        user.lastName = tokenPayload.lastName;
        user.roles = tokenPayload.roles[0].authority;

        return user;
    }

}
