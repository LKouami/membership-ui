import { Action, createReducer, on } from '@ngrx/store';
import { Member } from '../../shared/models/member';
import * as memberActions from './member.action';
import * as _ from 'lodash';
import * as storage from '../state/storage';

export interface State {
  members?: Member[];
  currentMember?: Member;
  deleteMemberId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  members: storage.getItem('member').members,
  currentMember: {}! as Member,
  deleteMemberId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const memberReducer = createReducer(
  initialState,

  // GetMembers
  on(memberActions.getMembers, (state) => ({...state, isLoading: true})),
  on(memberActions.getMembersSuccess, (state, result) => ({members: result.response, isLoading: false, isLoadingSuccess: true})),

  // Create Member Reducers
  on(memberActions.createMember, (state, {member}) => ({...state, isLoading: true, currentMember: member})),
  on(memberActions.createMemberSuccess, (state, result) => {
    const members = undefined !== state.members ? _.cloneDeep(state.members) : [];
    const currentMember = undefined !== state.currentMember ? _.cloneDeep(state.currentMember) : {} as Member;
    currentMember.Id = result.Id;
    members.push(currentMember);
    return {
      members,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Member Reducers
  on(memberActions.deleteMember, (state, {id}) => ({...state, isLoading: true, deleteMemberId: id})),
  on(memberActions.deleteMemberSuccess, (state, result) => {
    let members = undefined !== state.members ? _.cloneDeep(state.members) : [] as Member[];
      //delete members[state.deleteMemberId];
      const index = members.findIndex((member: Member) => {
       return member.Id === state.deleteMemberId
      
      });
      if (index !== -1) members.splice(index, 1);
    return {
      members,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

   // Edit Member Reducers
   on(memberActions.editMember, (state, {member}) => ({...state, isLoading: true, currentMember: member})),
   on(memberActions.editMemberSuccess, (state, result) => {
    let members = undefined !== state.members ? _.cloneDeep(state.members) : [] as Member[];
    const currentMember = undefined !== state.currentMember ? _.cloneDeep(state.currentMember) : {} as Member;
    members = members.map(member => {
      if (member.Id === currentMember.Id) {
        member = currentMember;
      }
      return member;
    });
    return {
      members,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return memberReducer(state, action);
}

export const getMembers = (state: State) => {
  return {
    members: state.members,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
