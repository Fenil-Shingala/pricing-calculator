import { BettingDashboardComponent } from './betting-dashboard.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('BettingDashboardComponent', () => {
  let component: BettingDashboardComponent;
  let fixture: ComponentFixture<BettingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BettingDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BettingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
