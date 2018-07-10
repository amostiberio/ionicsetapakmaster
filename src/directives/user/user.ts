import { Directive } from '@angular/core';

/**
 * Generated class for the UserDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[user]' // Attribute selector
})
export class UserDirective {

  constructor() {
    console.log('Hello UserDirective Directive');
  }

}
