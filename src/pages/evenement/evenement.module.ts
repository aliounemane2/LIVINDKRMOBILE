import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvenementPage } from './evenement';

@NgModule({
  declarations: [
    EvenementPage,
  ],
  imports: [
    IonicPageModule.forChild(EvenementPage),
  ],
})
export class EvenementPageModule {}
