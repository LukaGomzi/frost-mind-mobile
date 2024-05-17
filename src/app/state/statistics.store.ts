import { Injectable } from "@angular/core";
import { createStore, select, withProps } from "@ngneat/elf";
import { StatisticsService } from "../services/statistics.service";
import { map, Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

export interface StatisticsItem {
  name: string;
  weight: number;
  packages: number;
}

export interface StatisticsCategory {
  foodType: string;
  items: StatisticsItem[];
  totalWeight: number;
  totalPackages: number;
}

export interface Statistics {
  used: StatisticsCategory[];
  disposed: StatisticsCategory[];
}

interface StatisticsState {
  statistics?: Statistics;
  isLoading: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsStore {
  private statisticsStore = createStore(
    { name: 'statistics' },
    withProps<StatisticsState>({ isLoading: false })
  );

  constructor(
    private readonly statisticsService: StatisticsService
  ) {}

  getStatistics(): Observable<Statistics | undefined> {
    return this.statisticsStore.pipe(select(state => state.statistics));
  }

  loadStatistics(): void {
    this.statisticsStore.update(_ => ({
      isLoading: true,
      error: undefined,
      statistics: undefined
    }))
    this.statisticsService.getStatistics().subscribe({
      next: (stats) => {
        this.statisticsStore.update(currentState => ({
          ...currentState,
          isLoading: false,
          statistics: stats
        }));
      },
      error: (error) => {
        this.statisticsStore.update((state) => ({
          ...state,
          isLoading: false,
          error: error.message || 'Failed to fetch the statistics'
        }));
      }
    })
  }

  isLoading(): Observable<boolean> {
    return this.statisticsStore.pipe(select(state => state.isLoading));
  }

  getError(): Observable<string | undefined> {
    return this.statisticsStore.pipe(select(state => state.error));
  }
}
