import { Injectable } from "@angular/core";
import { createStore, select, withProps } from "@ngneat/elf";
import { StatisticsService } from "../services/statistics.service";
import { Observable } from "rxjs";

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
  loading: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsStore {
  private statisticsStore = createStore(
    { name: 'statistics' },
    withProps<StatisticsState>({ loading: false })
  );

  constructor(
    private readonly statisticsService: StatisticsService
  ) {}

  getStatistics(): Observable<Statistics | undefined> {
    return this.statisticsStore.pipe(select(state => state.statistics));
  }

  loadStatistics(): void {
    this.statisticsStore.update(_ => ({
      loading: true,
      error: undefined,
      statistics: undefined
    }))
    this.statisticsService.getStatistics().subscribe(stats => {
      this.statisticsStore.update(currentState => ({
        ...currentState,
        loading: false,
        statistics: stats
      }));
    });
  }

  isLoading(): Observable<boolean> {
    return this.statisticsStore.pipe(select(state => state.loading));
  }
}
