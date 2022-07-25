import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegistration from './registration.reducer';

export const selectRegistrationState = createFeatureSelector<fromRegistration.State>(
  fromRegistration.registrationFeatureKey
);

export const selectRegistration=createSelector(
  selectRegistrationState,
  (state)=>state.registration
);

export const selectLoading=createSelector(
  selectRegistrationState,
  (state)=>state.loading
);

export const selectRegistrationSuccess=createSelector(
  selectRegistration,
  selectLoading,
  (registration,loading)=>({registration,loading})
);