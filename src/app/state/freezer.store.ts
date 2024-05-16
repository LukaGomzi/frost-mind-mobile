import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { Freezer, FreezerService } from "../core/services/freezer.service"; // Update path if necessary
import { map, Observable, of, tap } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { FreezerItem, FreezerItemRequest } from "../core/models/freezer-item.model";

interface FreezersState {
  freezers: Freezer[];
}

@Injectable({
  providedIn: 'root'
})
export class FreezersStore {
  private freezersStore = createStore(
    { name: 'freezers' },
    withProps<FreezersState>({ freezers: [] })
  );

  constructor(private freezerService: FreezerService) {}

  getFreezers(): Observable<Freezer[]> {
    return this.freezersStore.pipe(select(state => state.freezers));
  }

  loadFreezers() {
    this.freezerService.getFreezers().subscribe((freezers) => {
      this.freezersStore.update((currentState) => ({
        ...currentState,
        freezers,
      }));
    });
  }

  addFreezer(freezer: Omit<Freezer, 'id'>): Observable<void> {
    return this.freezerService.addFreezer(freezer).pipe(
      tap(() => {
        this.loadFreezers();
      })
    );
  }

  addItemToFreezer(freezerId: number, item: FreezerItemRequest): Observable<FreezerItem | undefined> {
    return this.freezerService.addItemToFreezer(freezerId, item).pipe(
      tap(() => {
        this.loadFreezers();
      })
    );
  }

  getFreezerById(id: number): Observable<Freezer | undefined> {
    return this.getFreezers().pipe(
      map(freezers => freezers.find(freezer => freezer.id === id)),
      switchMap(freezer => {
        if (freezer) {
          return of(freezer);
        } else {
          return this.freezerService.getFreezerById(id).pipe(
            catchError(error => {
              console.error('Failed to fetch freezer from server', error);
              return of(undefined);
            })
          );
        }
      })
    );
  }

  deleteFreezer(id: number): Observable<void> {
    return this.freezerService.deleteFreezer(id).pipe(
      tap(() => {
        this.loadFreezers();
      })
    );
  }

  takeItemOut(freezerId: number, itemId: number, quantity?: number): Observable<void> {
    return this.freezerService.takeItemOutOfFreezer(freezerId, itemId, quantity).pipe(
      tap(() => this.loadFreezers())
    );
  }

  disposeItem(freezerId: number, itemId: number, quantity?: number): Observable<void> {
    return this.freezerService.disposeItemInFreezer(freezerId, itemId, quantity).pipe(
      tap(() => this.loadFreezers())
    );
  }

  assignFreezerToUser(freezerId: number, username: string): Observable<void> {
    return this.freezerService.assignFreezerToUser(freezerId, username);
  }

  reset(): void {
    this.freezersStore.reset();
  }
}
