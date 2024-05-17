import { Component, OnDestroy, OnInit } from '@angular/core';
import { Statistics, StatisticsCategory, StatisticsStore } from "../../state/statistics.store";
import { Observable, Subject, takeUntil } from "rxjs";

export enum ViewType {
  Used = 'used',
  Disposed = 'disposed'
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit, OnDestroy {
  statistics$: Observable<Statistics | undefined> = this.statisticsStore.getStatistics();
  isLoading$: Observable<boolean> = this.statisticsStore.isLoading();
  error?: string;
  viewType: ViewType = ViewType.Used;
  EnumViewType = ViewType;

  private subscription$ = new Subject<void>();

  constructor(
    private readonly statisticsStore: StatisticsStore
  ) { }

  ngOnInit() {
    this.loadStatistics();
    this.statisticsStore.getError().pipe(
      takeUntil(this.subscription$)
    ).subscribe(error => {
      this.error = error
    })
  }

  loadStatistics(): void {
    this.statisticsStore.loadStatistics();
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }

  calculateTotalWeightForCategories(categories: StatisticsCategory[]): number {
    let sum = 0;
    categories.forEach(category => {
      sum += category.totalWeight;
    })
    return sum;
  }

  calculateTotalPackagesForCategories(categories: StatisticsCategory[]): number {
    let sum = 0;
    categories.forEach(category => {
      sum += category.totalPackages;
    })
    return sum;
  }
}
