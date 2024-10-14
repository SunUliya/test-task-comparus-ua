import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { SmallSquareComponent } from '../../../shared/components/square/small-square.component';
import { PaintDirective } from '../../../shared/directives/paint.directive';
import { getArrayWithTwinValues, getUniqRandomNumber } from '../../../common/helpers';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Colors, MAX_SCORE, SQUARES_AMOUNT } from './constants';
import { PopupComponent } from '../../../shared/components/popup/popup.component';
import { CommonModule } from '@angular/common';
import { ScorePanelComponent } from './components/score-panel/score-panel.component';

@Component({
  selector: 'app-colored-square',
  standalone: true,
  imports: [ReactiveFormsModule, SmallSquareComponent, PaintDirective, PopupComponent, CommonModule, ScorePanelComponent],
  templateUrl: './colored-square.component.html',
  styleUrl: './colored-square.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ColoredSquareComponent {

  form: UntypedFormGroup;
  squares = getArrayWithTwinValues(Colors.Default, SQUARES_AMOUNT);
  score = {win: 0, loss: 0}
  isPopupShown = false;
  randomNumber: number | null = null;
  private destroyRef = inject(DestroyRef);
  private usedNumbers: number[] = [];
  private timerSubscription = Subscription.EMPTY;

  get isGameOver(): boolean {    
    return this.score.loss >= MAX_SCORE || this.score.win >= MAX_SCORE;
  }

  get delay() {
    return this.form.value.delay
  }

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly cdRef: ChangeDetectorRef
  ){
    this.form = this.fb.group({
      delay: ['', Validators.required]
    });
  }

  startGame(): void {
    this.form.disable();
    this.randomNumber = getUniqRandomNumber(this.usedNumbers, SQUARES_AMOUNT);
    this.squares[this.randomNumber] = Colors.Active;

    this.timerSubscription = timer(this.delay)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if(this.randomNumber !== null) this.squares[this.randomNumber] = Colors.Failed;
        this.score = {win: this.score.win, loss: ++this.score.loss};
        this.resetRandomNumber();
        this.nextStep();
        this.cdRef.markForCheck();
    }); 
  }

  selectSquare(index: number): void {
    if(index === this.randomNumber) {
      this.squares[this.randomNumber] = Colors.Success;
      this.timerSubscription.unsubscribe();
      this.score = {win: ++this.score.win, loss: this.score.loss};
      this.resetRandomNumber();
      this.nextStep();
    }
  }

  closePopup(): void {
    this.isPopupShown = false;
    this.score = {win: 0, loss: 0};
    this.randomNumber = 0;
    this.squares = getArrayWithTwinValues(Colors.Default, SQUARES_AMOUNT);
    this.form.reset();
  }

  private nextStep(): void {
    if(!this.isGameOver) {
      this.startGame();
    } else {
      this.gameOver();
    }
  }
  
  private gameOver(): void {
    this.isPopupShown = true;
    this.form.enable();
  }

  private resetRandomNumber(): void {
    if(this.randomNumber !== null) this.usedNumbers.push(this.randomNumber);
    this.randomNumber = null;
  } 
}
