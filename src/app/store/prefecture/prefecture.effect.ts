import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { PrefecturesService } from 'src/app/shared/services/prefectures/prefectures.service';

import * as prefectureActions from './prefecture.action';

@Injectable()
export class PrefectureEffect {

  constructor(
    private actions$: Actions,
    private prefectureService: PrefecturesService
  ) {}

  getPrefectures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(prefectureActions.getPrefectures),
      exhaustMap(action =>
        this.prefectureService.getPrefectures().pipe(
          map(response => {
            return prefectureActions.getPrefecturesSuccess({response});
          }),
          catchError((error: any) => of(prefectureActions.getPrefecturesFailure(error))))
      )
    )
  );

  createPrefecture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(prefectureActions.createPrefecture),
      exhaustMap(action =>
      
        this.prefectureService.addPrefecture(action.prefecture).pipe(
          map(response => 
            prefectureActions.createPrefectureSuccess(response)),
          catchError((error: any) => of(prefectureActions.createPrefectureFailure(error))))
      )
    )
  );


  deletePrefecture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(prefectureActions.deletePrefecture),
      exhaustMap(action => this.prefectureService.deletePrefecture(action.id).pipe(
          map(response => prefectureActions.deletePrefectureSuccess(response)),
          catchError((error: any) => of(prefectureActions.deletePrefectureFailure(error))))
      )
    )
  );

  editPrefecture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(prefectureActions.editPrefecture),
      exhaustMap(action =>
        this.prefectureService.editPrefecture(action.prefecture).pipe(
          map(response => prefectureActions.editPrefectureSuccess(response)),
          catchError((error: any) => of(prefectureActions.editPrefectureFailure(error))))
      )
    )
  );

}
