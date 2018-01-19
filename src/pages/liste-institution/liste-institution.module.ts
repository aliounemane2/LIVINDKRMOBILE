import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeInstitutionPage } from './liste-institution';

@NgModule({
  declarations: [
    ListeInstitutionPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeInstitutionPage),
  ],
})
export class ListeInstitutionPageModule {}
