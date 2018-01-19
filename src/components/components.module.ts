import { NgModule } from '@angular/core';
import { RatingComponent } from './rating/rating';
import { RateComponent } from './rate/rate';
import { PipeComponent } from './pipe/pipe';
@NgModule({
	declarations: [RatingComponent,
    RateComponent,
    PipeComponent],
	imports: [],
	exports: [RatingComponent,
    RateComponent,
    PipeComponent]
})
export class ComponentsModule {}
