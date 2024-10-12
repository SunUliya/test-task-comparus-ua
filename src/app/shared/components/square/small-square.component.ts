import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-small-square',
  standalone: true,
  imports: [],
  templateUrl: './small-square.component.html',
  styleUrl: './small-square.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class SmallSquareComponent {}
