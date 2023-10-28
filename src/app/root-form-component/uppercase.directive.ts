
import { Directive, ElementRef,  OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: 'input[uppercase]'
})

export class UpperCaseDirective implements OnInit {

    constructor(private eleRef: ElementRef, private renderer: Renderer2) {}
 
    ngOnInit(): void {
     this.renderer.setStyle(this.eleRef.nativeElement, 'text-transform', 'uppercase'); 
    }
    
}