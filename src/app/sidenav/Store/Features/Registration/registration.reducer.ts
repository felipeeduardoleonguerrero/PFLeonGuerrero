import { Action, createReducer, on } from '@ngrx/store';
import { Students } from 'src/app/services/students';
import * as RegistrationActions from './registration.actions';

export const registrationFeatureKey = 'registration';

export interface State {
  registration: Students[];
  loading:boolean,
  registrationDetailed:any
}

export const initialState: State = {
  registration:[],
  loading:true,
  registrationDetailed:{}
};

export const reducer = createReducer(
  initialState,

  on(RegistrationActions.loadRegistrations, (state) => {
    return {...state}
  }),
  on(RegistrationActions.loadRegistrationsSuccess, (state, {registration}) => {
    return {...state, registration, loading:false}
  }),
  on(RegistrationActions.loadRegistrationsFailure, (state, action) => state)

);