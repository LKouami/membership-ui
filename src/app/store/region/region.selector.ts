import { createSelector, createFeatureSelector, } from '@ngrx/store';
import * as regionReducer from './region.reducer'
// Region reducers Begin

export const getRegionState = createFeatureSelector<regionReducer.State>('region');

export const getRegions = createSelector(
  getRegionState,
  regionReducer.getRegions
);
