import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multiple-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multiple-calculator.component.html',
  styleUrl: './multiple-calculator.component.scss',
})
export class MultipleCalculatorComponent {
  oddsUnderdog = 1.57;
  oddsFavorite = 2.37;
  budget = 100;

  stakeUnderdog = 0;
  stakeFavorite = 0;

  outcome1 = 0; // Underdog scores first and loses
  outcome2 = 0; // Underdog wins
  outcome3 = 0; // Favorite wins clean
  outcome4 = 0; // Underdog loses without scoring

  calculate() {
    this.stakeUnderdog = this.budget * 0.4;
    this.stakeFavorite = this.budget * 0.6;

    // Outcome 1: Underdog scores first but loses → promo + favorite win
    this.outcome1 = 100 + this.stakeFavorite * this.oddsFavorite - this.budget;

    // Outcome 2: Underdog wins
    this.outcome2 = this.stakeUnderdog * this.oddsUnderdog - this.budget;

    // Outcome 3: Favorite wins without conceding
    this.outcome3 = this.stakeFavorite * this.oddsFavorite - this.stakeUnderdog;

    // Outcome 4: Underdog loses without scoring
    this.outcome4 = -this.stakeUnderdog;
  }
}
