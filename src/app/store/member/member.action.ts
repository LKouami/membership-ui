import { createAction, props } from '@ngrx/store';
import { Member } from '../../shared/models/member';

export const GET_MEMBERS = '[Member] Get Members';
export const GET_MEMBERS_SUCCESS = '[Member] Get Members Success';
export const GET_MEMBERS_FAILURE = '[Member] Get Members Failure';

export const CREATE_MEMBER = '[Member] Create Member';
export const CREATE_MEMBER_SUCCESS = '[Member] Create Member Success';
export const CREATE_MEMBER_FAILURE = '[Member] Create Member Failure';

export const DELETE_MEMBER = '[Member] Delete Member';
export const DELETE_MEMBER_SUCCESS = '[Member] Delete Member Success';
export const DELETE_MEMBER_FAILURE = '[Member] Delete Member Failure';

export const EDIT_MEMBER = '[Member] Edit Member';
export const EDIT_MEMBER_SUCCESS = '[Member] Edit Member Success';
export const EDIT_MEMBER_FAILURE = '[Member] Edit Member Failure';


export const getMembers = createAction(
  GET_MEMBERS
);

export const getMembersSuccess = createAction(
  GET_MEMBERS_SUCCESS,
  props<any>()
);

export const getMembersFailure = createAction(
  GET_MEMBERS_FAILURE,
  props<{props:any}>()
);

export const createMember = createAction(
  CREATE_MEMBER,
  props<{member: Member}>()
);

export const createMemberSuccess = createAction(
  CREATE_MEMBER_SUCCESS,
  props<any>()
);

export const createMemberFailure = createAction(
  CREATE_MEMBER_FAILURE,
  props<{props:any}>()
);

export const deleteMember = createAction(
  DELETE_MEMBER,
  props<{id : string}>()
);

export const deleteMemberSuccess = createAction(
  DELETE_MEMBER_SUCCESS,
  props<any>()
);

export const deleteMemberFailure = createAction(
  DELETE_MEMBER_FAILURE,
  props<{props:any}>()
);

export const editMember = createAction(
  EDIT_MEMBER,
  props<{member: Member}>()
);

export const editMemberSuccess = createAction(
  EDIT_MEMBER_SUCCESS,
  props<any>()
);

export const editMemberFailure = createAction(
  EDIT_MEMBER_FAILURE,
  props<{props:any}>()
);
