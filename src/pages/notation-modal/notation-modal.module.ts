import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotationModalPage } from './notation-modal';

@NgModule({
  declarations: [
    NotationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NotationModalPage),
  ],
})
export class NotationModalPageModule {}
