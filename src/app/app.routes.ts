import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { MultipleCalculatorComponent } from './multiple-calculator/multiple-calculator.component';
import { ShortCalculationComponent } from './short-calculation/short-calculation.component';

export const routes: Routes = [
  { path: '', component: ShortCalculationComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'multi', component: MultipleCalculatorComponent },
  { path: '**', redirectTo: '' },
];
