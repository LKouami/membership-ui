import { createSelector, createFeatureSelector, } from '@ngrx/store';
import * as prefectureReducer from './prefecture.reducer'
// Prefecture reducers Begin

export const getPrefectureState = createFeatureSelector<prefectureReducer.State>('prefecture');

export const getPrefectures = createSelector(
  getPrefectureState,
  prefectureReducer.getPrefectures
);
