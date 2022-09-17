import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CommunesService } from 'src/app/shared/services/communes/communes.service';

import * as communeActions from './commune.action';

@Injectable()
export class CommuneEffect {

  constructor(
    private actions$: Actions,
    private communeService: CommunesService
  ) {}

  getCommunes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(communeActions.getCommunes),
      exhaustMap(action =>
        this.communeService.getCommunes().pipe(
          map(response => {
            return communeActions.getCommunesSuccess({response});
          }),
          catchError((error: any) => of(communeActions.getCommunesFailure(error))))
      )
    )
  );

  createCommune$ = createEffect(() =>
    this.actions$.pipe(
      ofType(communeActions.createCommune),
      exhaustMap(action =>
      
        this.communeService.addCommune(action.commune).pipe(
          map(response => 
            communeActions.createCommuneSuccess(response)),
          catchError((error: any) => of(communeActions.createCommuneFailure(error))))
      )
    )
  );


  deleteCommune$ = createEffect(() =>
    this.actions$.pipe(
      ofType(communeActions.deleteCommune),
      exhaustMap(action => this.communeService.deleteCommune(action.id).pipe(
          map(response => communeActions.deleteCommuneSuccess(response)),
          catchError((error: any) => of(communeActions.deleteCommuneFailure(error))))
      )
    )
  );

  editCommune$ = createEffect(() =>
    this.actions$.pipe(
      ofType(communeActions.editCommune),
      exhaustMap(action =>
        this.communeService.editCommune(action.commune).pipe(
          map(response => communeActions.editCommuneSuccess(response)),
          catchError((error: any) => of(communeActions.editCommuneFailure(error))))
      )
    )
  );

}
