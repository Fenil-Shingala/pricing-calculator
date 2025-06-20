import { Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Matches } from './data/matches';

@Component({
  selector: 'app-betting-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipModule, RouterModule],
  templateUrl: './betting-dashboard.component.html',
  styleUrl: './betting-dashboard.component.scss',
})
export class BettingDashboardComponent {
  search = '';
  targetPayout = 100;
  maxDrawLossPercent = 100;
  filterDate = this.formatDate(new Date());
  promoMatches = Matches;

  formatDate(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  get calculatedMatches() {
    return this.promoMatches
      .filter((match) => {
        const now = new Date();

        // Combine date and time into full DateTime
        const matchDateTime = new Date(`${match.date} ${match.time}`);

        const isFutureMatch = matchDateTime >= now;

        const searchLower = this.search.toLowerCase();

        // Check if any field matches the search
        return (
          match.date >= this.filterDate &&
          isFutureMatch &&
          (match.teamHome.toLowerCase().includes(searchLower) ||
            match.teamAway.toLowerCase().includes(searchLower) ||
            match.teamAwayFull.includes(searchLower) ||
            match.teamHomeFull.includes(searchLower) ||
            (
              match.teamAway.toLowerCase() +
              ' vs ' +
              match.teamHome.toLowerCase()
            ).includes(searchLower) ||
            (
              match.teamAwayFull.toLowerCase() +
              ' vs ' +
              match.teamHomeFull.toLowerCase()
            ).includes(searchLower) ||
            match.time.includes(searchLower) ||
            match.date.includes(searchLower) ||
            match.oddsA.toString().includes(searchLower) ||
            match.oddsB.toString().includes(searchLower) ||
            match.oddsDraw.toString().includes(searchLower))
        );
      })
      .map((match) => {
        const stakeA = this.targetPayout / match.oddsA;
        const stakeB = this.targetPayout / match.oddsB;
        const stakeWithoutDraw = stakeA + stakeB;
        let stakeDraw = 0;

        if (this.maxDrawLossPercent >= 0) {
          const allowedLoss =
            (this.maxDrawLossPercent / 100) * stakeWithoutDraw;
          stakeDraw = (allowedLoss - stakeWithoutDraw) / (1 - match.oddsDraw);
          if (stakeDraw < 0) stakeDraw = 0;
        }

        const totalStake = stakeA + stakeB + stakeDraw;
        const profitA = stakeA * match.oddsA - totalStake;
        const profitB = stakeB * match.oddsB - totalStake;
        const profitDraw = stakeDraw * match.oddsDraw - totalStake;

        const bestCase = profitA + profitB;
        const worstCase = Math.min(profitA, profitB, profitDraw);

        return {
          ...match,
          stakeA,
          stakeB,
          stakeDraw,
          totalStake,
          profitA,
          profitB,
          profitDraw,
          bestCase,
          worstCase,
        };
      });
  }

  constructor(private router: Router) {}

  validateTargetPayout(): void {
    if (this.targetPayout > 1000) {
      this.targetPayout = 1000;
    }
  }

  autoCalculate(match: any) {
    const data = {
      ...match,
      targetPayout: this.targetPayout,
      maxDrawLossPercent: this.maxDrawLossPercent,
    };
    this.router.navigate(['/calculator'], { state: data });
  }
}
