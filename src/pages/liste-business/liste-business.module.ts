import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeBusinessPage } from './liste-business';

@NgModule({
  declarations: [
    ListeBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeBusinessPage),
  ],
})
export class ListeBusinessPageModule {}
