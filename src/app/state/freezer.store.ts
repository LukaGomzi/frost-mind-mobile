import { createStore, withProps, select } from '@ngneat/elf';
import { FoodItem, Freezer, FreezerService } from "../core/services/freezer.service";
import { map, Observable, of, tap } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

interface FreezersState {
  freezers: Freezer[];
}

const freezersStore = createStore(
  { name: 'freezers' },
  withProps<FreezersState>({ freezers: [] })
);

export const updateFreezers = (freezers: Freezer[]) => {
  freezersStore.update(state => ({
    ...state,
    freezers,
  }));
};

export const freezers$ = freezersStore.pipe(select(state => state.freezers));

export const getFreezerByFreezerId = (freezerId: number, freezerService: FreezerService): Observable<Freezer | undefined> => {
  return freezers$.pipe(
    map(freezers => freezers.find(freezer => freezer.id === freezerId)),
    switchMap(freezer => {
      if (freezer) {
        return of(freezer);
      } else {
        return freezerService.getFreezerById(freezerId).pipe(
          catchError(error => {
            console.error('Failed to fetch freezer from server', error);
            return of(undefined);
          })
        );
      }
    })
  );
};
