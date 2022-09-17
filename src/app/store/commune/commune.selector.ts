import { createSelector, createFeatureSelector, } from '@ngrx/store';
import * as communeReducer from './commune.reducer'
// Commune reducers Begin

export const getCommuneState = createFeatureSelector<communeReducer.State>('commune');

export const getCommunes = createSelector(
  getCommuneState,
  communeReducer.getCommunes
);
