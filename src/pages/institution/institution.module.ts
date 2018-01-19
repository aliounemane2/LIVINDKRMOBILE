import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstitutionPage } from './institution';

@NgModule({
  declarations: [
    InstitutionPage,
  ],
  imports: [
    IonicPageModule.forChild(InstitutionPage),
  ],
})
export class InstitutionPageModule {}
