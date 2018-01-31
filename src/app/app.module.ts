import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { LoginPage } from '../pages/login/login';
import { InscriptionPage } from '../pages/inscription/inscription';
import { ProfilPage } from '../pages/profil/profil';
import { InscriptionValidationPage } from '../pages/inscription-validation/inscription-validation';
import { InscriptionIneterestPage } from '../pages/inscription-ineterest/inscription-ineterest';
import { HttpModule } from '@angular/http';
import { AccueilPage } from '../pages/accueil/accueil';
import { CarteMapPage } from '../pages/carte-map/carte-map';
import { ConnectvityServiceProvider } from '../providers/connectvity-service/connectvity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { EvenementPage } from '../pages/evenement/evenement';
import { DetailsEventPage } from '../pages/details-event/details-event';
import { InstitutionPage } from '../pages/institution/institution';
import { EventServiceProvider } from '../providers/event-service/event-service';
import { Network } from '@ionic-native/network';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RatingComponent} from '../components/rating/rating';
import {RateComponent} from '../components/rate/rate';
import { Camera } from '@ionic-native/camera';
import { LocationsProvider } from '../providers/locations/locations';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { NotationModalPage } from '../pages/notation-modal/notation-modal';
import { Diagnostic } from '@ionic-native/diagnostic';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { RecommendationPage } from '../pages/recommendation/recommendation';
import { ListeInstitutionPage } from '../pages/liste-institution/liste-institution';
import { ListeBusinessPage } from '../pages/liste-business/liste-business';
import { PublicitePage } from '../pages/publicite/publicite';
import { Calendar } from '@ionic-native/calendar';
import { CallNumber } from '@ionic-native/call-number';
import { DetailsDecouvertePage } from '../pages/details-decouverte/details-decouverte';
import { RechercheDecouvertePage } from '../pages/recherche-decouverte/recherche-decouverte';
import { DetailsSightPage } from '../pages/details-sight/details-sight';

//import {OrderByPipe} from "../pages/evenement/evenement";
import {OrderByPipe} from "./orderby.pipe";
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Toast } from '@ionic-native/toast';
import { GooglePlus } from '@ionic-native/google-plus';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    InscriptionPage,
    ProfilPage,
    InscriptionValidationPage,
    InscriptionIneterestPage,
    AccueilPage,
    CarteMapPage,
    EvenementPage,
    DetailsEventPage,
    InstitutionPage,
    RatingComponent,
    NotationModalPage,
    RecommendationPage,
    ListeInstitutionPage,
    ListeBusinessPage,
    PublicitePage,
    DetailsDecouvertePage,
    OrderByPipe,
    RateComponent,
    RechercheDecouvertePage,
    DetailsSightPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule, 
    ReactiveFormsModule,
    IonicStorageModule.forRoot({
        name: '__mydb',
        driverOrder: ['sqlite', 'websql', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    InscriptionPage,
    ProfilPage,
    InscriptionValidationPage,
    InscriptionIneterestPage,
    AccueilPage,
    CarteMapPage,
    EvenementPage,
    DetailsEventPage,
    InstitutionPage,
    RatingComponent,
    NotationModalPage,
    RecommendationPage,
    ListeInstitutionPage,
    ListeBusinessPage,
    PublicitePage,
    DetailsDecouvertePage,
    RateComponent,
    RechercheDecouvertePage,
    DetailsSightPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    ConnectvityServiceProvider,
    Geolocation,
    EventServiceProvider,
    Network,
    Camera,
    LocationsProvider,
    LocationTrackerProvider,
    BackgroundGeolocation,
    Diagnostic,
    Facebook,
    Calendar,
    OrderByPipe,
    CallNumber,
    FileTransfer,
    Toast,
    GooglePlus
  ]
})
export class AppModule {}
