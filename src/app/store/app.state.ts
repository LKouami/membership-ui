
import * as memberState from './member/member.reducer';
import * as regionState from './region/region.reducer';
import * as prefectureState from './prefecture/prefecture.reducer';
import * as communeState from './commune/commune.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    return reducer(state, action);
  };
}

const reducerKeys = ['member','region','prefecture','commune'];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug, localStorageSyncReducer] : [localStorageSyncReducer];
export interface State {
  member: memberState.State;
  region: regionState.State;
  prefecture: prefectureState.State;
  commune: communeState.State;
}
export const reducers: ActionReducerMap<State> = {
  member: memberState.reducer,
  region: regionState.reducer,
  prefecture: prefectureState.reducer,
  commune: communeState.reducer
};