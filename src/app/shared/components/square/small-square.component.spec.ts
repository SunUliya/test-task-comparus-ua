import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSquareComponent } from './small-square.component';

describe('SquareComponent', () => {
  let component: SmallSquareComponent;
  let fixture: ComponentFixture<SmallSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallSquareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
