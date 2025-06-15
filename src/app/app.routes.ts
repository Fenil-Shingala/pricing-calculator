import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { MultipleCalculatorComponent } from './multiple-calculator/multiple-calculator.component';

export const routes: Routes = [
  { path: '', component: CalculatorComponent },
  { path: 'multi', component: MultipleCalculatorComponent },
  { path: '**', redirectTo: '' },
];
