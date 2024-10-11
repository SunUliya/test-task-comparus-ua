import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[paint]',
    standalone: true
})
export class PaintDirective implements OnChanges{

    @Input() paint = '';

    constructor(private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.el.nativeElement.style.background = changes['paint'].currentValue;
    }
}