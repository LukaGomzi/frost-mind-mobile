import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { Freezer, FreezerService, FreezerUser } from "../core/services/freezer.service"; // Update path if necessary
import { map, Observable, of, tap } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { FreezerItem, FreezerItemRequest } from "../core/models/freezer-item.model";

interface FreezersState {
  freezers: Freezer[];
  isLoading: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FreezersStore {
  private freezersStore = createStore(
    { name: 'freezers' },
    withProps<FreezersState>({ freezers: [], isLoading: false })
  );

  constructor(private freezerService: FreezerService) {}

  getFreezers(): Observable<Freezer[]> {
    return this.freezersStore.pipe(select(state => state.freezers));
  }

  loadFreezers() {
    this.freezersStore.update((_) => ({
      freezers: [],
      isLoading: true,
      error: undefined // Clear any previous error
    }));

    this.freezerService.getFreezers().subscribe({
      next: (freezers) => {
        this.freezersStore.update((currentState) => ({
          ...currentState,
          freezers,
          isLoading: false,
          error: undefined // Clear any previous error
        }));
      },
      error: (err) => {
        this.freezersStore.update((currentState) => ({
          ...currentState,
          isLoading: false,
          error: err.message || 'Failed to load freezers'
        }));
      }
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

  removeUserFromFreezer(freezerId: number, username: string): Observable<void> {
    return this.freezerService.removeUserFromFreezer(freezerId, username);
  }

  getFreezerUsers(freezerId: number): Observable<FreezerUser[]> {
    return this.freezerService.loadFreezerUsers(freezerId);
  }

  reset(): void {
    this.freezersStore.reset();
  }

  isLoading(): Observable<boolean> {
    return this.freezersStore.pipe(select(state => state.isLoading));
  }

  getError(): Observable<string | undefined> {
    return this.freezersStore.pipe(select(state => state.error));
  }
}
