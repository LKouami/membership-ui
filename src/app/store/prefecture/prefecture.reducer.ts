import { Action, createReducer, on } from '@ngrx/store';
import { Prefecture } from '../../shared/models/prefecture';
import * as prefectureActions from './prefecture.action';
import * as _ from 'lodash';
import * as storage from '../state/storage';

export interface State {
  prefectures?: Prefecture[];
  currentPrefecture?: Prefecture;
  deletePrefectureId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  prefectures: storage.getItem('prefecture').prefectures,
  currentPrefecture: {}! as Prefecture,
  deletePrefectureId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const prefectureReducer = createReducer(
  initialState,

  // GetPrefectures
  on(prefectureActions.getPrefectures, (state) => ({...state, isLoading: true})),
  on(prefectureActions.getPrefecturesSuccess, (state, result) => ({prefectures: result.response, isLoading: false, isLoadingSuccess: true})),
  

  // Create Prefecture Reducers
  on(prefectureActions.createPrefecture, (state, {prefecture}) => ({...state, isLoading: true, currentPrefecture: prefecture})),
  on(prefectureActions.createPrefectureSuccess, (state, result) => {
    const prefectures = undefined !== state.prefectures ? _.cloneDeep(state.prefectures) : [];
    const currentPrefecture = undefined !== state.currentPrefecture ? _.cloneDeep(state.currentPrefecture) : {} as Prefecture;
    currentPrefecture.Id = result.Id;
    prefectures.push(currentPrefecture);
    return {
      prefectures,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Prefecture Reducers
  on(prefectureActions.deletePrefecture, (state, {id}) => ({...state, isLoading: true, deletePrefectureId: id})),
  on(prefectureActions.deletePrefectureSuccess, (state, result) => {
    let prefectures = undefined !== state.prefectures ? _.cloneDeep(state.prefectures) : [] as Prefecture[];
      //delete prefectures[state.deletePrefectureId];
      const index = prefectures.findIndex((prefecture: Prefecture) => {
       return prefecture.Id === state.deletePrefectureId
      
      });
      if (index !== -1) prefectures.splice(index, 1);
    return {
      prefectures,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

   // Edit Prefecture Reducers
   on(prefectureActions.editPrefecture, (state, {prefecture}) => ({...state, isLoading: true, currentPrefecture: prefecture})),
   on(prefectureActions.editPrefectureSuccess, (state, result) => {
    let prefectures = undefined !== state.prefectures ? _.cloneDeep(state.prefectures) : [] as Prefecture[];
    const currentPrefecture = undefined !== state.currentPrefecture ? _.cloneDeep(state.currentPrefecture) : {} as Prefecture;
    prefectures = prefectures.map(prefecture => {
      if (prefecture.Id === currentPrefecture.Id) {
        prefecture = currentPrefecture;
      }
      return prefecture;
    });
    return {
      prefectures,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return prefectureReducer(state, action);
}

export const getPrefectures = (state: State) => {
  return {
    prefectures: state.prefectures,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
