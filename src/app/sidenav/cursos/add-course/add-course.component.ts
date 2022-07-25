import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';
import { postCourse, updateCourse } from '../../Store/Features/Courses/courses.actions';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnDestroy {

  coursesForm:FormGroup;
  
  subscriptions: Subscription;

  courseToEdit: any;

  constructor(private fb:FormBuilder, private studentsService:StudentsService, private router:Router, private store:Store<any>, private coursesService:CoursesService) { }

  ngOnInit(): void {

    this.subscriptions=new Subscription();

    this.coursesForm=this.fb.group({

      name:['', Validators .required],
      cost:['', Validators .required]

    })

      //Suscripción a los cursos a editar

      this.subscriptions.add(
        this.studentsService.getCourseToEdit().subscribe(
  
          val=>this.courseToEdit=val
  
        )
      )

    //Al editar al curso se llenan los valores del formulario con patchValue

    if(this.courseToEdit){

      this.coursesForm.get('name')?.patchValue(this.courseToEdit.name);
      this.coursesForm.get('cost')?.patchValue(this.courseToEdit.cost);
      
    }

  }

  onSubmit(){

    const course = this.coursesForm.value;
    
    //Actualizar o actualizar al estudiante a la MOCKAPI
    
    if(!this.courseToEdit){
      this.store.dispatch(postCourse({course:course}));
      this.router.navigate(['/home/courses/list']);
    } else {
      course['id']=this.courseToEdit.id;
      this.store.dispatch(updateCourse({courseUpdated:course}));
      this.coursesService.courseToEdit=null;
      this.router.navigate(['/home/courses/list'])
    }

  }

  goBack () {
    this.studentsService.courseToEdit=null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}