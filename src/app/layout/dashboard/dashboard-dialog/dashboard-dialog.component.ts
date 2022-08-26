import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.scss']
})
export class DashboardDialogComponent implements OnInit {
  dashboardForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: {title: string, content : {firstname : string, lastname : string, email : string}, isEdit : boolean},
    private dashbordFormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    const content = this.data.content;
    this.dashboardForm = this.dashbordFormBuilder.group({
      firstname: new FormControl(content.firstname, [Validators.required]),
      lastname: new FormControl(content.lastname, [Validators.required]),
      email: new FormControl(content.email, [Validators.required, Validators.email]),
    });
  }
  getFirstnameErrorMessage() {
    if (this.dashboardForm.controls['firstname']!.hasError('required')) {
      return 'Entrez une valeur';
    }

    return this.dashboardForm.controls['firstname']!.hasError('firstname') ? 'Firstname incorrect' : '';
  }
  getLastnameErrorMessage() {
    if (this.dashboardForm.controls['lastname']!.hasError('required')) {
      return 'Entrez une valeur';
    }

    return this.dashboardForm.controls['lastname']!.hasError('lastname') ? 'Lastname incorrect' : '';
  }
  getEmailErrorMessage() {
    if (this.dashboardForm.controls['email']!.hasError('required')) {
      return 'Entrez une valeur';
    }

    return this.dashboardForm.controls['email']!.hasError('email') ? 'Email incorrect' : '';
  }
}
