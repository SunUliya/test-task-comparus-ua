import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-panel',
  standalone: true,
  imports: [],
  templateUrl: './score-panel.component.html',
  styleUrl: './score-panel.component.css'
})
export class ScorePanelComponent {
  @Input() score?: {win: number, loss: number}
}
