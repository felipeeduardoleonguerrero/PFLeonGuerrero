import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as RegistrationActions from './registration.actions';
import { StudentsService } from 'src/app/services/students.service';


@Injectable()
export class RegistrationEffects {

  loadRegistrations$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(RegistrationActions.loadRegistrations),
      mergeMap(() => this.studentsService.getStudentsList()
        .pipe(
          map(registration => RegistrationActions.loadRegistrationsSuccess({ registration })),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  postRegistration$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(RegistrationActions.postRegistration),
      mergeMap((registration) => this.studentsService.postStudent(registration.registration)
        .pipe(
          map(() => RegistrationActions.loadRegistrations()),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  updateRegistration$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(RegistrationActions.updateRegistration),
      mergeMap((registration) => this.studentsService.updateStudent(registration.registrationUpdated)
        .pipe(
          map(() => RegistrationActions.loadRegistrations()),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  constructor(private actions$: Actions, private studentsService:StudentsService) {}
}