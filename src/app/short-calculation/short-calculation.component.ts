import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-short-calculation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './short-calculation.component.html',
  styleUrl: './short-calculation.component.scss',
})
export class ShortCalculationComponent {
  oddsA = 0;
  oddsB = 0;
  oddsDraw = 0;
  targetPayout = 0;
  maxDrawLossPercent = 100;

  stakeA = 0;
  stakeB = 0;
  stakeDraw = 0;
  totalStake = 0;

  profitA = 0;
  profitB = 0;
  profitDraw = 0;

  bestCase = 0;
  worstCase = 0;
  targetProfit = 0;

  cards: any = [];
  inputFields = [
    { label: 'Odds Team A', key: 'oddsA', model: 0 },
    { label: 'Odds Team B', key: 'oddsB', model: 0 },
    { label: 'Target Payout', key: 'targetPayout', model: 0 },
    { label: 'Odds Draw', key: 'oddsDraw', model: 0 },
    {
      label: 'Draw Loss %',
      key: 'maxDrawLossPercent',
      model: this.maxDrawLossPercent,
    },
  ];

  ngOnInit(): void {
    this.setCards();
  }

  onFieldChange() {
    this.inputFields.forEach((field: any) => {
      (this as any)[field.key] = field.model;
    });
    this.calculateStakes();
    this.setCards();
  }

  calculateStakes() {
    if (this.oddsA < 1 || this.oddsB < 1 || this.targetPayout <= 0) {
      this.stakeA = this.stakeB = this.stakeDraw = this.totalStake = 0;
      this.profitA = this.profitB = this.profitDraw = 0;
      this.bestCase = this.worstCase = 0;
      return;
    }

    // Calculate main stakes for A + B
    this.stakeA = this.targetPayout / this.oddsA;
    this.stakeB = this.targetPayout / this.oddsB;
    const stakeWithoutDraw = this.stakeA + this.stakeB;

    // Optional draw protection
    if (this.maxDrawLossPercent >= 0) {
      const allowedDrawLoss =
        (this.maxDrawLossPercent / 100) * stakeWithoutDraw;
      this.stakeDraw =
        (allowedDrawLoss - stakeWithoutDraw) / (1 - this.oddsDraw);

      if (this.stakeDraw < 0) this.stakeDraw = 0; // No negative stake
    } else {
      this.stakeDraw = 0;
    }

    this.totalStake = stakeWithoutDraw + this.stakeDraw;

    // Profits
    this.profitA = this.stakeA * this.oddsA - this.totalStake;
    this.profitB = this.stakeB * this.oddsB - this.totalStake;
    this.profitDraw = this.stakeDraw * this.oddsDraw - this.totalStake;

    // Best case: Team A or Team B (whichever gives higher profit)
    this.bestCase =
      this.stakeA * this.oddsA + this.stakeB * this.oddsB - this.totalStake;

    // Worst case: one of the outcomes
    this.worstCase = Math.min(this.profitA, this.profitB, this.profitDraw);
  }

  setCards(): void {
    this.cards = [
      {
        title: '💸 Stake Summary',
        headerColor: '#2F80ED',
        items: [
          { label: 'Team A Stake', value: this.stakeA, color: '#27AE60' },
          { label: 'Team B Stake', value: this.stakeB, color: '#27AE60' },
          { label: 'Draw Stake', value: this.stakeDraw, color: '#F2994A' },
          { label: 'Total Stake', value: this.totalStake, color: '#2F80ED' },
        ],
      },
      {
        title: '📈 Profit Scenario',
        headerColor: '#27AE60',
        items: [
          {
            label: 'Profit if Team A wins',
            value: this.profitA,
            color: this.profitA >= 0 ? '#27AE60' : '#EB5757',
          },
          {
            label: 'Profit if Team B wins',
            value: this.profitB,
            color: this.profitB >= 0 ? '#27AE60' : '#EB5757',
          },
          {
            label: 'Profit if Draw',
            value: this.profitDraw,
            color: this.profitDraw >= 0 ? '#27AE60' : '#EB5757',
          },
        ],
      },
      {
        title: '🌟 Best / Worst Case',
        headerColor: '#F2994A',
        items: [
          { label: 'Best Case Profit', value: this.bestCase, color: '#27AE60' },
          {
            label: 'Worst Case Profit/Loss',
            value: this.worstCase,
            color: this.worstCase >= 0 ? '#27AE60' : '#EB5757',
          },
        ],
      },
    ];
  }
}
