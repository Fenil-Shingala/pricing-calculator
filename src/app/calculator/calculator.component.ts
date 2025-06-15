import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  teamAOdds: number = 0;
  teamBOdds: number = 0;
  targetPayout: number = 0;
  totalStake: number = 0;

  stakeA: number = 0;
  stakeB: number = 0;
  maxLoss: number = 0;

  teamAWinsProfit: number = 0;
  teamBWinsProfit: number = 0;
  bothLoseLoss: number = 0;
  bothWinProfit: number = 0;

  drawOdds: number = 0;
  drawProtectionStake: number = 0;
  drawWinAmount: number = 0;
  drawNet: number = 0;

  combinedAWins: number = 0;
  combinedBWins: number = 0;
  combinedDraw: number = 0;

  bestCaseProfit: number = 0;
  worstCaseProfit: number = 0;

  lastChanged: 'targetPayout' | 'totalStake' | null = null;

  onInputChange(changedField: string) {
    this.lastChanged = changedField as any;

    if (this.teamAOdds <= 1 || this.teamBOdds <= 1) return;

    if (this.lastChanged === 'targetPayout') {
      this.stakeA = this.targetPayout / this.teamAOdds;
      this.stakeB = this.targetPayout / this.teamBOdds;
      this.totalStake = this.stakeA + this.stakeB;
    } else if (this.lastChanged === 'totalStake') {
      const invA = 1 / this.teamAOdds;
      const invB = 1 / this.teamBOdds;
      const totalInv = invA + invB;
      this.stakeA = (invA / totalInv) * this.totalStake;
      this.stakeB = (invB / totalInv) * this.totalStake;
      this.targetPayout = Math.min(
        this.stakeA * this.teamAOdds,
        this.stakeB * this.teamBOdds
      );
    }

    this.maxLoss = Math.min(this.stakeA, this.stakeB);

    this.teamAWinsProfit = this.stakeA * this.teamAOdds - this.totalStake;
    this.teamBWinsProfit = this.stakeB * this.teamBOdds - this.totalStake;
    this.bothLoseLoss = -this.totalStake;
    this.bothWinProfit =
      this.stakeA * this.teamAOdds +
      this.stakeB * this.teamBOdds -
      this.totalStake;

    this.calculateCombinedOutcomes();
  }

  calculateDrawProtection() {
    if (this.drawOdds > 1) {
      this.drawProtectionStake =
        (this.stakeA + this.stakeB) / (this.drawOdds - 1);
      this.drawWinAmount = this.drawProtectionStake * this.drawOdds;
      this.drawNet =
        this.drawWinAmount -
        (this.stakeA + this.stakeB + this.drawProtectionStake);
    } else {
      this.drawProtectionStake = 0;
      this.drawWinAmount = 0;
      this.drawNet = 0;
    }

    this.calculateCombinedOutcomes();
  }

  calculateCombinedOutcomes() {
    const totalStake = this.stakeA + this.stakeB + this.drawProtectionStake;

    this.combinedAWins = this.stakeA * this.teamAOdds - totalStake;
    this.combinedBWins = this.stakeB * this.teamBOdds - totalStake;
    this.combinedDraw = this.drawProtectionStake * this.drawOdds - totalStake;

    this.updateBestWorstCase();
  }

  updateBestWorstCase(): void {
    const possibleResults = [
      this.teamAWinsProfit,
      this.teamBWinsProfit,
      this.drawNet,
      this.bothWinProfit,
      this.bothLoseLoss,
    ];

    this.bestCaseProfit = Math.max(...possibleResults);
    this.worstCaseProfit = Math.min(...possibleResults);
  }
}
