import { createAction, props } from '@ngrx/store';
import { Commune } from '../../shared/models/commune';

export const GET_COMMUNES = '[Commune] Get Communes';
export const GET_COMMUNES_SUCCESS = '[Commune] Get Communes Success';
export const GET_COMMUNES_FAILURE = '[Commune] Get Communes Failure';

export const CREATE_COMMUNE = '[Commune] Create Commune';
export const CREATE_COMMUNE_SUCCESS = '[Commune] Create Commune Success';
export const CREATE_COMMUNE_FAILURE = '[Commune] Create Commune Failure';

export const DELETE_COMMUNE = '[Commune] Delete Commune';
export const DELETE_COMMUNE_SUCCESS = '[Commune] Delete Commune Success';
export const DELETE_COMMUNE_FAILURE = '[Commune] Delete Commune Failure';

export const EDIT_COMMUNE = '[Commune] Edit Commune';
export const EDIT_COMMUNE_SUCCESS = '[Commune] Edit Commune Success';
export const EDIT_COMMUNE_FAILURE = '[Commune] Edit Commune Failure';


export const getCommunes = createAction(
  GET_COMMUNES
);

export const getCommunesSuccess = createAction(
  GET_COMMUNES_SUCCESS,
  props<any>()
);

export const getCommunesFailure = createAction(
  GET_COMMUNES_FAILURE,
  props<{props:any}>()
);

export const createCommune = createAction(
  CREATE_COMMUNE,
  props<{commune: Commune}>()
);

export const createCommuneSuccess = createAction(
  CREATE_COMMUNE_SUCCESS,
  props<any>()
);

export const createCommuneFailure = createAction(
  CREATE_COMMUNE_FAILURE,
  props<{props:any}>()
);

export const deleteCommune = createAction(
  DELETE_COMMUNE,
  props<{id : string}>()
);

export const deleteCommuneSuccess = createAction(
  DELETE_COMMUNE_SUCCESS,
  props<any>()
);

export const deleteCommuneFailure = createAction(
  DELETE_COMMUNE_FAILURE,
  props<{props:any}>()
);

export const editCommune = createAction(
  EDIT_COMMUNE,
  props<{commune: Commune}>()
);

export const editCommuneSuccess = createAction(
  EDIT_COMMUNE_SUCCESS,
  props<any>()
);

export const editCommuneFailure = createAction(
  EDIT_COMMUNE_FAILURE,
  props<{props:any}>()
);
