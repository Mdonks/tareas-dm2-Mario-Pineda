import {  Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomStyle]'
})
export class CustomStyleDirective {

  constructor(el: ElementRef, render: Renderer2) {
    render.setStyle(el.nativeElement,'border-radius', '50px');
    render.setStyle(el.nativeElement,'padding', '7px 15px');
    render.setStyle(el.nativeElement,'background-color', '#29916e');
    render.setStyle(el.nativeElement,'font-size', '15px');
   }

}