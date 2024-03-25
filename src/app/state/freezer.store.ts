import { createStore, withProps, select } from '@ngneat/elf';
import { Freezer } from "../core/services/freezer.service";

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
