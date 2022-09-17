import { createAction, props } from '@ngrx/store';
import { Prefecture } from '../../shared/models/prefecture';

export const GET_PREFECTURES = '[Prefecture] Get Prefectures';
export const GET_PREFECTURES_SUCCESS = '[Prefecture] Get Prefectures Success';
export const GET_PREFECTURES_FAILURE = '[Prefecture] Get Prefectures Failure';

export const CREATE_PREFECTURE = '[Prefecture] Create Prefecture';
export const CREATE_PREFECTURE_SUCCESS = '[Prefecture] Create Prefecture Success';
export const CREATE_PREFECTURE_FAILURE = '[Prefecture] Create Prefecture Failure';

export const DELETE_PREFECTURE = '[Prefecture] Delete Prefecture';
export const DELETE_PREFECTURE_SUCCESS = '[Prefecture] Delete Prefecture Success';
export const DELETE_PREFECTURE_FAILURE = '[Prefecture] Delete Prefecture Failure';

export const EDIT_PREFECTURE = '[Prefecture] Edit Prefecture';
export const EDIT_PREFECTURE_SUCCESS = '[Prefecture] Edit Prefecture Success';
export const EDIT_PREFECTURE_FAILURE = '[Prefecture] Edit Prefecture Failure';


export const getPrefectures = createAction(
  GET_PREFECTURES
);

export const getPrefecturesSuccess = createAction(
  GET_PREFECTURES_SUCCESS,
  props<any>()
);

export const getPrefecturesFailure = createAction(
  GET_PREFECTURES_FAILURE,
  props<{props:any}>()
);

export const createPrefecture = createAction(
  CREATE_PREFECTURE,
  props<{prefecture: Prefecture}>()
);

export const createPrefectureSuccess = createAction(
  CREATE_PREFECTURE_SUCCESS,
  props<any>()
);

export const createPrefectureFailure = createAction(
  CREATE_PREFECTURE_FAILURE,
  props<{props:any}>()
);

export const deletePrefecture = createAction(
  DELETE_PREFECTURE,
  props<{id : string}>()
);

export const deletePrefectureSuccess = createAction(
  DELETE_PREFECTURE_SUCCESS,
  props<any>()
);

export const deletePrefectureFailure = createAction(
  DELETE_PREFECTURE_FAILURE,
  props<{props:any}>()
);

export const editPrefecture = createAction(
  EDIT_PREFECTURE,
  props<{prefecture: Prefecture}>()
);

export const editPrefectureSuccess = createAction(
  EDIT_PREFECTURE_SUCCESS,
  props<any>()
);

export const editPrefectureFailure = createAction(
  EDIT_PREFECTURE_FAILURE,
  props<{props:any}>()
);
