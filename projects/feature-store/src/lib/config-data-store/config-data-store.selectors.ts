import { createSelector } from '@ngrx/store';
import { selectConfigData } from './config-data-store.reducer';

export const selectAirports = createSelector(selectConfigData,
    (configData) => configData.airports);
