import { createSelector, createFeatureSelector, } from '@ngrx/store';
import * as memberReducer from './member.reducer'
// Member reducers Begin

export const getMemberState = createFeatureSelector<memberReducer.State>('member');

export const getMembers = createSelector(
  getMemberState,
  memberReducer.getMembers
);
