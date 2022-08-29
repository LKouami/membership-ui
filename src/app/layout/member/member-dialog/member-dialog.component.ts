import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent implements OnInit {
  memberForm!: FormGroup;
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
    this.memberForm = this.dashbordFormBuilder.group({
      firstname: new FormControl(content.firstname, [Validators.required]),
      lastname: new FormControl(content.lastname, [Validators.required]),
      email: new FormControl(content.email, [Validators.required, Validators.email]),
    });
  }
  getFirstnameErrorMessage() {
    if (this.memberForm.controls['firstname']!.hasError('required')) {
      return 'Entrez une valeur';
    }

    return this.memberForm.controls['firstname']!.hasError('firstname') ? 'Firstname incorrect' : '';
  }
  getLastnameErrorMessage() {
    if (this.memberForm.controls['lastname']!.hasError('required')) {
      return 'Entrez une valeur';
    }

    return this.memberForm.controls['lastname']!.hasError('lastname') ? 'Lastname incorrect' : '';
  }
  getEmailErrorMessage() {
    if (this.memberForm.controls['email']!.hasError('required')) {
      return 'Entrez une valeur';
    }

    return this.memberForm.controls['email']!.hasError('email') ? 'Email incorrect' : '';
  }
}
