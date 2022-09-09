import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { MembersService } from 'src/app/shared/services/members/members.service';

import * as memberActions from './member.action';

@Injectable()
export class MemberEffect {

  constructor(
    private actions$: Actions,
    private memberService: MembersService
  ) {}

  getMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(memberActions.getMembers),
      exhaustMap(action =>
        this.memberService.getMembers().pipe(
          map(response => {
            console.log('----------------------------------------------------------------');
            console.log('response:::', response);    
            console.log('----------------------------------------------------------------');

            return memberActions.getMembersSuccess({response});
          }),
          catchError((error: any) => of(memberActions.getMembersFailure(error))))
      )
    )
  );

  createMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(memberActions.createMember),
      exhaustMap(action =>
      
        this.memberService.addMember(action.member).pipe(
          map(response => 
            memberActions.createMemberSuccess(response)),
          catchError((error: any) => of(memberActions.createMemberFailure(error))))
      )
    )
  );


  deleteMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(memberActions.deleteMember),
      exhaustMap(action => this.memberService.deleteMember(action.id).pipe(
          map(response => memberActions.deleteMemberSuccess(response)),
          catchError((error: any) => of(memberActions.deleteMemberFailure(error))))
      )
    )
  );

  editMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(memberActions.editMember),
      exhaustMap(action =>
        this.memberService.editMember(action.member).pipe(
          map(response => memberActions.editMemberSuccess(response)),
          catchError((error: any) => of(memberActions.editMemberFailure(error))))
      )
    )
  );

}
