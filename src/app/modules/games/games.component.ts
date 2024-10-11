import { Component } from '@angular/core';
import { ColoredSquareComponent } from "./colored-square/colored-square.component";

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [ColoredSquareComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {}
