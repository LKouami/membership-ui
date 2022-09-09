
import * as memberState from './member/member.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

const reducerKeys = ['member'];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug, localStorageSyncReducer] : [localStorageSyncReducer];
export interface State {
  member: memberState.State;
}
export const reducers: ActionReducerMap<State> = {
  member: memberState.reducer,
};