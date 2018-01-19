import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscriptionValidationPage } from './inscription-validation';

@NgModule({
  declarations: [
    InscriptionValidationPage,
  ],
  imports: [
    IonicPageModule.forChild(InscriptionValidationPage),
  ],
})
export class InscriptionValidationPageModule {}
