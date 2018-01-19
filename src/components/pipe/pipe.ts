import { Component } from '@angular/core';

/**
 * Generated class for the PipeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pipe',
  templateUrl: 'pipe.html'
})
export class PipeComponent {

  text: string;

  constructor() {
    console.log('Hello PipeComponent Component');
    this.text = 'Hello World';
  }

}
