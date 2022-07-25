import { createAction, props } from '@ngrx/store';
import { Registration } from 'src/app/services/registration';
import { Students } from 'src/app/services/students';

export const loadRegistrations = createAction(
  '[Registration] Load Registrations'
);

export const loadRegistrationsSuccess = createAction(
  '[Registration] Load Registrations Success',
  props<{ registration: Students[] }>()
);

export const loadRegistrationsFailure = createAction(
  '[Registration] Load Registrations Failure',
  props<{ error: any }>()
);

export const deleteRegistration = createAction (
  '[Registration] delete registration',
  props<{id:string}>()
);

export const postRegistration = createAction (
  '[Registration] post registration',
  props<{registration:Students}>()
);

export const updateRegistration = createAction (
  '[Registration] update registration',
  props<{registrationUpdated:Students}>()
);