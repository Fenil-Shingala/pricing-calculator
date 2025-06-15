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
  // teamAOdds: number = 1.57;
  // teamBOdds: number = 2.37;
  // targetPayout: number = 100;
  // stakeA: number = 0;
  // stakeB: number = 0;
  // totalStake: number = 0;
  // maxLoss: number = 0;

  // calculateStakes() {
  //   this.stakeA = this.targetPayout / this.teamAOdds;
  //   this.stakeB = this.targetPayout / this.teamBOdds;
  //   this.totalStake = this.stakeA + this.stakeB;
  //   this.maxLoss = Math.min(this.stakeA, this.stakeB);
  // }

  teamAOdds: number = 0;
  teamBOdds: number = 0;
  targetPayout: number = 0;
  totalStake: number = 0;
  teamATotal: number = 0;
  teamBTotal: number = 0;

  stakeA: number = 0;
  stakeB: number = 0;
  maxLoss: number = 0;

  teamAWinsProfit: number = 0;
  teamBWinsProfit: number = 0;
  bothLoseLoss: number = 0;
  netProfitOrLoss: number = 0;
  bothWinProfit: number = 0;

  lastChanged: 'targetPayout' | 'totalStake' | null = null;

  // onInputChange(changedField: string) {
  //   this.lastChanged = changedField as any;

  //   if (this.teamAOdds <= 1 || this.teamBOdds <= 1) {
  //     return; // avoid division by zero or invalid odds
  //   }

  //   if (this.lastChanged === 'targetPayout') {
  //     this.stakeA = this.targetPayout / this.teamAOdds;
  //     this.stakeB = this.targetPayout / this.teamBOdds;
  //     this.totalStake = this.stakeA + this.stakeB;
  //   } else if (this.lastChanged === 'totalStake') {
  //     const invA = 1 / this.teamAOdds;
  //     const invB = 1 / this.teamBOdds;
  //     const totalInv = invA + invB;

  //     this.stakeA = (invA / totalInv) * this.totalStake;
  //     this.stakeB = (invB / totalInv) * this.totalStake;

  //     this.targetPayout = Math.min(
  //       this.stakeA * this.teamAOdds,
  //       this.stakeB * this.teamBOdds
  //     );
  //   }

  //   this.maxLoss = Math.min(this.stakeA, this.stakeB);
  //   this.teamATotal = this.stakeA * this.teamAOdds;
  //   this.teamBTotal = this.stakeB * this.teamBOdds;
  // }

  onInputChange(changedField: string) {
    this.lastChanged = changedField as any;

    if (this.teamAOdds <= 1 || this.teamBOdds <= 1) {
      return; // avoid invalid odds
    }

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
    this.teamATotal = this.stakeA * this.teamAOdds;
    this.teamBTotal = this.stakeB * this.teamBOdds;

    // Outcomes
    this.teamAWinsProfit = this.teamATotal - this.totalStake;
    this.teamBWinsProfit = this.teamBTotal - this.totalStake;
    this.bothLoseLoss = -this.totalStake;

    // New: both win promotion payout
    this.bothWinProfit = this.teamATotal + this.teamBTotal - this.totalStake;

    // Net = worst win case
    this.netProfitOrLoss = Math.min(this.teamAWinsProfit, this.teamBWinsProfit);
  }
}
