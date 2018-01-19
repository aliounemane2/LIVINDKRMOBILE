import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecommendationPage } from './recommendation';

@NgModule({
  declarations: [
    RecommendationPage,
  ],
  imports: [
    IonicPageModule.forChild(RecommendationPage),
  ],
})
export class RecommendationPageModule {}
