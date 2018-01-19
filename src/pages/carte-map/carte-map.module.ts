import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarteMapPage } from './carte-map';

@NgModule({
  declarations: [
    CarteMapPage,
  ],
  imports: [
    IonicPageModule.forChild(CarteMapPage),
  ],
})
export class CarteMapPageModule {}
