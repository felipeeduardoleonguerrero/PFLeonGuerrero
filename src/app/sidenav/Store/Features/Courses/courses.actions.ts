import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/services/course';
import { Registration } from 'src/app/services/registration';

export const loadCoursess = createAction(
  '[Courses] Load Coursess'
);

export const loadCoursessSuccess = createAction(
  '[Courses] Load Coursess Success',
  props<{ courses: Course[] }>()
);

export const loadCoursessFailure = createAction(
  '[Courses] Load Coursess Failure',
  props<{ error: any }>()
);

export const deleteCourse = createAction (
  '[Courses] delete course',
  props<{id:string}>()
);

export const postCourse = createAction (
  '[Courses] post course',
  props<{course:Course}>()
);

export const getDetailedCourse = createAction (
  '[Courses] getDetailed course',
  props<{id:string}>()
);

export const getDetailedCourseSuccess = createAction (
  '[Courses] getDetailed course success',
  props<{courseDetailed:Course}>()
);

export const updateCourse = createAction (
  '[Students] update course',
  props<{courseUpdated:Course}>()
);

//Acciones para detalles del curso

export const loadRegistrations = createAction(
  '[Registration] Load Registrations'
);

export const loadRegistrationsSuccess = createAction(
  '[Registration] Load Registrations Success',
  props<{ registrations: Registration[] }>()
);

export const loadRegistrationFailure = createAction(
  '[Registration] Load Registrations Failure',
  props<{ error: any }>()
);

export const deleteRegistration = createAction (
  '[Registration] delete registration',
  props<{id:string}>()
);