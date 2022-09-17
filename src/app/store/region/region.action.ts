import { createAction, props } from '@ngrx/store';
import { Region } from '../../shared/models/region';

export const GET_REGIONS = '[Region] Get Regions';
export const GET_REGIONS_SUCCESS = '[Region] Get Regions Success';
export const GET_REGIONS_FAILURE = '[Region] Get Regions Failure';

export const CREATE_REGION = '[Region] Create Region';
export const CREATE_REGION_SUCCESS = '[Region] Create Region Success';
export const CREATE_REGION_FAILURE = '[Region] Create Region Failure';

export const DELETE_REGION = '[Region] Delete Region';
export const DELETE_REGION_SUCCESS = '[Region] Delete Region Success';
export const DELETE_REGION_FAILURE = '[Region] Delete Region Failure';

export const EDIT_REGION = '[Region] Edit Region';
export const EDIT_REGION_SUCCESS = '[Region] Edit Region Success';
export const EDIT_REGION_FAILURE = '[Region] Edit Region Failure';


export const getRegions = createAction(
  GET_REGIONS
);

export const getRegionsSuccess = createAction(
  GET_REGIONS_SUCCESS,
  props<any>()
);

export const getRegionsFailure = createAction(
  GET_REGIONS_FAILURE,
  props<{props:any}>()
);

export const createRegion = createAction(
  CREATE_REGION,
  props<{region: Region}>()
);

export const createRegionSuccess = createAction(
  CREATE_REGION_SUCCESS,
  props<any>()
);

export const createRegionFailure = createAction(
  CREATE_REGION_FAILURE,
  props<{props:any}>()
);

export const deleteRegion = createAction(
  DELETE_REGION,
  props<{id : string}>()
);

export const deleteRegionSuccess = createAction(
  DELETE_REGION_SUCCESS,
  props<any>()
);

export const deleteRegionFailure = createAction(
  DELETE_REGION_FAILURE,
  props<{props:any}>()
);

export const editRegion = createAction(
  EDIT_REGION,
  props<{region: Region}>()
);

export const editRegionSuccess = createAction(
  EDIT_REGION_SUCCESS,
  props<any>()
);

export const editRegionFailure = createAction(
  EDIT_REGION_FAILURE,
  props<{props:any}>()
);
