import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { RegionsService } from 'src/app/shared/services/regions/regions.service';

import * as regionActions from './region.action';

@Injectable()
export class RegionEffect {

  constructor(
    private actions$: Actions,
    private regionService: RegionsService
  ) {}

  getRegions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regionActions.getRegions),
      exhaustMap(action =>
        this.regionService.getRegions().pipe(
          map(response => {
            return regionActions.getRegionsSuccess({response});
          }),
          catchError((error: any) => of(regionActions.getRegionsFailure(error))))
      )
    )
  );

  createRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regionActions.createRegion),
      exhaustMap(action =>
      
        this.regionService.addRegion(action.region).pipe(
          map(response => 
            regionActions.createRegionSuccess(response)),
          catchError((error: any) => of(regionActions.createRegionFailure(error))))
      )
    )
  );


  deleteRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regionActions.deleteRegion),
      exhaustMap(action => this.regionService.deleteRegion(action.id).pipe(
          map(response => regionActions.deleteRegionSuccess(response)),
          catchError((error: any) => of(regionActions.deleteRegionFailure(error))))
      )
    )
  );

  editRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regionActions.editRegion),
      exhaustMap(action =>
        this.regionService.editRegion(action.region).pipe(
          map(response => regionActions.editRegionSuccess(response)),
          catchError((error: any) => of(regionActions.editRegionFailure(error))))
      )
    )
  );

}
