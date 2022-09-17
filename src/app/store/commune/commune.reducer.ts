import { Action, createReducer, on } from '@ngrx/store';
import { Commune } from '../../shared/models/commune';
import * as communeActions from './commune.action';
import * as _ from 'lodash';
import * as storage from '../state/storage';

export interface State {
  communes?: Commune[];
  currentCommune?: Commune;
  deleteCommuneId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  communes: storage.getItem('commune').communes,
  currentCommune: {}! as Commune,
  deleteCommuneId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const communeReducer = createReducer(
  initialState,

  // GetCommunes
  on(communeActions.getCommunes, (state) => ({...state, isLoading: true})),
  on(communeActions.getCommunesSuccess, (state, result) => ({communes: result.response, isLoading: false, isLoadingSuccess: true})),

  // Create Commune Reducers
  on(communeActions.createCommune, (state, {commune}) => ({...state, isLoading: true, currentCommune: commune})),
  on(communeActions.createCommuneSuccess, (state, result) => {
    const communes = undefined !== state.communes ? _.cloneDeep(state.communes) : [];
    const currentCommune = undefined !== state.currentCommune ? _.cloneDeep(state.currentCommune) : {} as Commune;
    currentCommune.Id = result.Id;
    communes.push(currentCommune);
    return {
      communes,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Commune Reducers
  on(communeActions.deleteCommune, (state, {id}) => ({...state, isLoading: true, deleteCommuneId: id})),
  on(communeActions.deleteCommuneSuccess, (state, result) => {
    let communes = undefined !== state.communes ? _.cloneDeep(state.communes) : [] as Commune[];
      //delete communes[state.deleteCommuneId];
      const index = communes.findIndex((commune: Commune) => {
       return commune.Id === state.deleteCommuneId
      
      });
      if (index !== -1) communes.splice(index, 1);
    return {
      communes,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

   // Edit Commune Reducers
   on(communeActions.editCommune, (state, {commune}) => ({...state, isLoading: true, currentCommune: commune})),
   on(communeActions.editCommuneSuccess, (state, result) => {
    let communes = undefined !== state.communes ? _.cloneDeep(state.communes) : [] as Commune[];
    const currentCommune = undefined !== state.currentCommune ? _.cloneDeep(state.currentCommune) : {} as Commune;
    communes = communes.map(commune => {
      if (commune.Id === currentCommune.Id) {
        commune = currentCommune;
      }
      return commune;
    });
    return {
      communes,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return communeReducer(state, action);
}

export const getCommunes = (state: State) => {
  return {
    communes: state.communes,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
