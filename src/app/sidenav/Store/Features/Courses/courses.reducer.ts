import { Action, createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/services/course';
import { Registration } from 'src/app/services/registration';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export const registrationsFeatureKey = 'registrations';

export interface State {
  courses: Course[],
  loading:boolean,
  courseDetailed:any,
  registrations: Registration[]
}

export const initialState: State = {
  courses:[],
  loading:true,
  courseDetailed:{},
  registrations:[],
};

export const reducer = createReducer(
  initialState,

  on(CoursesActions.loadCoursess, (state) => {
    return {...state}
  }),
  on(CoursesActions.loadCoursessSuccess, (state, {courses}) => {
    return {...state, courses, loading:false}
  }),
  on(CoursesActions.loadCoursessFailure, (state, action) => state),

  on(CoursesActions.getDetailedCourseSuccess, (state, {courseDetailed})=>{
    return {...state, courseDetailed}
  }),

  // Estados para detalles del curso / inscripciones

  on(CoursesActions.loadRegistrations, (state) => {
    return {...state}
  }),
  on(CoursesActions.loadRegistrationsSuccess, (state, {registrations}) => {
    return {...state, registrations}
  }),
  on(CoursesActions.loadRegistrationFailure, (state, action) => state),

);
