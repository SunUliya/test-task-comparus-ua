import { ChangeDetectionStrategy, Component, input} from '@angular/core';
import { IScore } from '../../../../../common/interfaces';

@Component({
  selector: 'app-score-panel',
  standalone: true,
  imports: [],
  templateUrl: './score-panel.component.html',
  styleUrl: './score-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ScorePanelComponent {
  score = input<IScore>();
}
