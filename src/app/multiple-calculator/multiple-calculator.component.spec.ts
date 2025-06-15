import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleCalculatorComponent } from './multiple-calculator.component';

describe('MultipleCalculatorComponent', () => {
  let component: MultipleCalculatorComponent;
  let fixture: ComponentFixture<MultipleCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
