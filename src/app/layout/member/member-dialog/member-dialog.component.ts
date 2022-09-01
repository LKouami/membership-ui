import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/shared/models/member';
@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent implements OnInit {
  memberForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string, content: Member, isEdit: boolean },
    private dashbordFormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    const content = this.data.content;
    this.memberForm = this.dashbordFormBuilder.group({
      Firstname: new FormControl(content.Firstname, [Validators.required]),
      Lastname: new FormControl(content.Lastname, [Validators.required]),
      Cni: new FormControl(content.Cni, [Validators.required, Validators.required]),
      NumCard: new FormControl(content.NumCard, [Validators.required]),
      Gender: new FormControl(content.Gender, [Validators.required]),
      Birthdate: new FormControl(content.Birthdate, [Validators.required]),
      BirthPlace: new FormControl(content.BirthPlace, [Validators.required]),
      Occupation: new FormControl(content.Occupation, [Validators.required]),
      Province: new FormControl(content.Province, [Validators.required]),
      SubscriptionType: new FormControl(content.SubscriptionType, [Validators.required]),
      SubscriptionDate: new FormControl(content.SubscriptionDate, [Validators.required]),
      CommuneId: new FormControl(content.CommuneId, [Validators.required]),
      Contact: new FormControl(content.Contact, [Validators.required]),
      MembershipNum: new FormControl(content.MembershipNum, [Validators.required]),
      QrCodeRef: new FormControl(content.QrCodeRef, [Validators.required]),

    });
  }
  getFirstnameErrorMessage() {
    if (this.memberForm.controls['Firstname']!.hasError('required')) {
      return 'Entrez une valeur';
    }

    return this.memberForm.controls['Firstname']!.hasError('Firstname') ? 'Firstname incorrect' : '';
  }
  getLastnameErrorMessage() {
    if (this.memberForm.controls['Lastname']!.hasError('required')) {
      return 'Entrez une valeur';
    }

    return this.memberForm.controls['Lastname']!.hasError('Lastname') ? 'Lastname incorrect' : '';
  }
  getCniErrorMessage() {
    if (this.memberForm.controls['Cni']!.hasError('required')) {
      return 'Entrez une valeur';
    }

    return this.memberForm.controls['Cni']!.hasError('Cni') ? 'Cni incorrect' : '';
  }
  getNumCardErrorMessage() {
    if (this.memberForm.controls['NumCard']!.hasError('required')) {
      return 'Entrez une valeur';
    }

    return this.memberForm.controls['NumCard']!.hasError('NumCard') ? 'NumCard incorrect' : '';
  }
  getGenderErrorMessage() {
    if (this.memberForm.controls['Gender']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['Gender']!.hasError('Gender') ? 'Gender incorrect' : '';
  }
  getBirthdateErrorMessage() {
    if (this.memberForm.controls['Birthdate']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['Birthdate']!.hasError('Birthdate') ? 'Birthdate incorrect' : '';

  }
  getBirthPlaceErrorMessage() {
    if (this.memberForm.controls['BirthPlace']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['BirthPlace']!.hasError('BirthPlace') ? 'BirthPlace incorrect' : '';

  }
  getOccupationErrorMessage() {
    if (this.memberForm.controls['Occupation']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['Occupation']!.hasError('Occupation') ? 'Occupation incorrect' : '';

  }
  getProvinceErrorMessage() {
    if (this.memberForm.controls['Province']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['Province']!.hasError('Province') ? 'Province incorrect' : '';

  }
  getSubscriptionTypeErrorMessage() {
    if (this.memberForm.controls['SubscriptionType']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['SubscriptionType']!.hasError('SubscriptionType') ? 'SubscriptionType incorrect' : '';

  }
  getSubscriptionDateErrorMessage() {
    if (this.memberForm.controls['SubscriptionDate']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['SubscriptionDate']!.hasError('SubscriptionDate') ? 'SubscriptionDate incorrect' : '';

  }
  getCommuneIdErrorMessage() {
    if (this.memberForm.controls['CommuneId']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['CommuneId']!.hasError('CommuneId') ? 'CommuneId incorrect' : '';

  }
  getContactErrorMessage() {
    if (this.memberForm.controls['Contact']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['Contact']!.hasError('Contact') ? 'Contact incorrect' : '';

  }
  getMembershipNumErrorMessage() {
    if (this.memberForm.controls['MembershipNum']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['MembershipNum']!.hasError('MembershipNum') ? 'MembershipNum incorrect' : '';

  }
  getQrCodeRefErrorMessage() {
    if (this.memberForm.controls['QrCodeRef']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.memberForm.controls['QrCodeRef']!.hasError('QrCodeRef') ? 'QrCodeRef incorrect' : '';

  }
  
}