import { Action, createReducer, on } from '@ngrx/store';
import { Region } from '../../shared/models/region';
import * as regionActions from './region.action';
import * as _ from 'lodash';
import * as storage from '../state/storage';

export interface State {
  regions?: Region[];
  currentRegion?: Region;
  deleteRegionId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  regions: storage.getItem('region').regions,
  currentRegion: {}! as Region,
  deleteRegionId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const regionReducer = createReducer(
  initialState,

  // GetRegions
  on(regionActions.getRegions, (state) => ({...state, isLoading: true})),
  on(regionActions.getRegionsSuccess, (state, result) => ({regions: result.response, isLoading: false, isLoadingSuccess: true})),

  // Create Region Reducers
  on(regionActions.createRegion, (state, {region}) => ({...state, isLoading: true, currentRegion: region})),
  on(regionActions.createRegionSuccess, (state, result) => {
    const regions = undefined !== state.regions ? _.cloneDeep(state.regions) : [];
    const currentRegion = undefined !== state.currentRegion ? _.cloneDeep(state.currentRegion) : {} as Region;
    currentRegion.Id = result.Id;
    regions.push(currentRegion);
    return {
      regions,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Region Reducers
  on(regionActions.deleteRegion, (state, {id}) => ({...state, isLoading: true, deleteRegionId: id})),
  on(regionActions.deleteRegionSuccess, (state, result) => {
    let regions = undefined !== state.regions ? _.cloneDeep(state.regions) : [] as Region[];
      //delete regions[state.deleteRegionId];
      const index = regions.findIndex((region: Region) => {
       return region.Id === state.deleteRegionId
      
      });
      if (index !== -1) regions.splice(index, 1);
    return {
      regions,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

   // Edit Region Reducers
   on(regionActions.editRegion, (state, {region}) => ({...state, isLoading: true, currentRegion: region})),
   on(regionActions.editRegionSuccess, (state, result) => {
    let regions = undefined !== state.regions ? _.cloneDeep(state.regions) : [] as Region[];
    const currentRegion = undefined !== state.currentRegion ? _.cloneDeep(state.currentRegion) : {} as Region;
    regions = regions.map(region => {
      if (region.Id === currentRegion.Id) {
        region = currentRegion;
      }
      return region;
    });
    return {
      regions,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return regionReducer(state, action);
}

export const getRegions = (state: State) => {
  return {
    regions: state.regions,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
