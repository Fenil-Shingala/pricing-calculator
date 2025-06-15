import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortCalculationComponent } from './short-calculation.component';

describe('ShortCalculationComponent', () => {
  let component: ShortCalculationComponent;
  let fixture: ComponentFixture<ShortCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortCalculationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
