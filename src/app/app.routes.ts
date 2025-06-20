import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { MultipleCalculatorComponent } from './multiple-calculator/multiple-calculator.component';
import { ShortCalculationComponent } from './short-calculation/short-calculation.component';
import { BettingDashboardComponent } from './betting-dashboard/betting-dashboard.component';

export const routes: Routes = [
  { path: '', component: BettingDashboardComponent },
  { path: 'calculator', component: ShortCalculationComponent },
  { path: 'full-calculator', component: CalculatorComponent },
  { path: 'multi', component: MultipleCalculatorComponent },
  { path: '**', redirectTo: '' },
];
