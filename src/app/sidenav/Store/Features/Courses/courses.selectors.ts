import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from './courses.reducer';

export const selectCoursesState = createFeatureSelector<fromCourses.State>(
  fromCourses.coursesFeatureKey
);

export const selectCourses=createSelector(
  selectCoursesState,
  (state)=>state.courses
);

export const selectLoading=createSelector(
  selectCoursesState,
  (state)=>state.loading
);

export const selectCoursesSuccess=createSelector(
  selectCourses,
  selectLoading,
  (courses,loading)=>({courses,loading})
);

export const selectCourseDetailedSuccess=createSelector(
  selectCoursesState,
  (state)=>state.courseDetailed
)

// Detalles del curso / inscripciones

export const selectRegistrationsState = createFeatureSelector<fromCourses.State>(
  fromCourses.registrationsFeatureKey
);

export const selectRegistrations=createSelector(
  selectRegistrationsState,
  (state)=>state.registrations
);

export const selectRegistrationsSuccess=createSelector(
  selectRegistrations,
  (registrations)=>({registrations})
);