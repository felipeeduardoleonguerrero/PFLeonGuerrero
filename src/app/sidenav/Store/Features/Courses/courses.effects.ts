import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as CoursesActions from './courses.actions';
import { CoursesService } from 'src/app/services/courses.service';
import { RegistrationService } from 'src/app/services/registration.service';


@Injectable()
export class CoursesEffects {

  loadCourseFeature$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(CoursesActions.loadCoursess),
      mergeMap(() => this.coursesService.getCoursesList()
        .pipe(
          map(courses => CoursesActions.loadCoursessSuccess({ courses })),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  deleteCourses$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      mergeMap((course) => this.coursesService.removeCourse(course.id)
        .pipe(
          map(() => CoursesActions.loadCoursess()),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  postCourses$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(CoursesActions.postCourse),
      mergeMap((course) => this.coursesService.postCourse(course.course)
        .pipe(
          map(() => CoursesActions.loadCoursess()),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  getCourseDetailed$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(CoursesActions.getDetailedCourse),
      mergeMap((course) => this.coursesService.getCourseDetails(course.id)
        .pipe(
          map((courseDetailed) => CoursesActions.getDetailedCourseSuccess({courseDetailed})),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  updateCourse$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      mergeMap((course) => this.coursesService.updateCourse(course.courseUpdated)
        .pipe(
          map(() => CoursesActions.loadCoursess()),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  loadRegistrations$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(CoursesActions.loadRegistrations),
      mergeMap(() => this.registrationService.getRegistrationList()
        .pipe(
          map(registrations => CoursesActions.loadRegistrationsSuccess({ registrations })),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  deleteRegistration$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(CoursesActions.deleteRegistration),
      mergeMap((registration) => this.registrationService.removeRegistration(registration.id)
        .pipe(
          map(() => CoursesActions.loadRegistrations()),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  constructor(private actions$: Actions, private coursesService:CoursesService, private registrationService:RegistrationService) {}
}
