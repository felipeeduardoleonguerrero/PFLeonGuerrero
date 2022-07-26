import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/services/students.service';
import { Store } from '@ngrx/store';
import { loadStudentss, postStudents, updateStudent } from '../../Store/Features/Students/students.actions';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})

export class StudentsFormComponent implements OnInit, OnDestroy {
  
  studentForm:FormGroup;

  studentToEdit:any;

  subscriptions:Subscription;

  constructor(private fb:FormBuilder, private studentsService:StudentsService, private router:Router, private store: Store<any>) { }

  ngOnInit(): void {

    this.subscriptions=new Subscription();

    this.studentForm=this.fb.group({

      studentName:['', Validators .required],
      studentSurname:['', Validators .required],
      email:[null, Validators.required],
      country:[null, Validators.required]

    })

    //Uso del observable en StudentsService para editar al estudiante
    
    this.subscriptions.add(
      this.studentsService.getStudentToEdit().subscribe(
        val=>this.studentToEdit=val
      )
    )

    //Al editar al estudiante se llenan los valores del formulario con patchValue

    if(this.studentToEdit){

      this.studentForm.get('studentName')?.patchValue(this.studentToEdit.studentName);
      this.studentForm.get('studentSurname')?.patchValue(this.studentToEdit.studentSurname);
      this.studentForm.get('email')?.patchValue(this.studentToEdit.email);
      this.studentForm.get('country')?.patchValue(this.studentToEdit.country);
      
    }
    
  }

  onSubmit(){

    const student = this.studentForm.value;
    
    //Actualizar o actualizar al estudiante a la MOCKAPI
    
    if(!this.studentToEdit){
      this.store.dispatch(postStudents({student:student}));
      this.router.navigate(['/home/students/list']);
    } else {
      student['id']=this.studentToEdit.id;
      this.store.dispatch(updateStudent({studentUpdated:student}));
      this.studentsService.studentToEdit=null;
      this.router.navigate(['/home/students/list']);
    }
    this.store.dispatch(loadStudentss());
  }

  goBack () {
    this.studentsService.studentToEdit=null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}