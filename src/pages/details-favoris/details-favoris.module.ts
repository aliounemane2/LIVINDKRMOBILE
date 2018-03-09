import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsFavorisPage } from './details-favoris';

@NgModule({
  declarations: [
    DetailsFavorisPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsFavorisPage),
  ],
})
export class DetailsFavorisPageModule {}
