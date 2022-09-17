import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Commune } from 'src/app/shared/models/commune';
import { CommunesService } from 'src/app/shared/services/communes/communes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as communeActions from '../../../store/commune/commune.action';
import { Prefecture } from 'src/app/shared/models/prefecture';
import { CommonFunctions } from 'src/app/utils/common-functions';
@Component({
  selector: 'app-commune-dialog',
  templateUrl: './commune-dialog.component.html',
  styleUrls: ['./commune-dialog.component.scss']
})
export class CommuneDialogComponent implements OnInit {
  communeForm!: FormGroup;
  @Output() deleteTask = new EventEmitter<any>();
  @Output() editTask = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {action: string, title: string, content: Commune, isEdit: boolean , prefectures:Prefecture[]},
    private dashbordFormBuilder: FormBuilder,
    private communeService: CommunesService,
    private snackBar: MatSnackBar,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    let content = {} as Commune;
    let prefectures: Prefecture[] = [];
    this.data.isEdit ? content = this.data.content  : content = {} as Commune;
    this.data.isEdit ? prefectures = this.data.prefectures  : prefectures = [] as Prefecture[];
    this.communeForm = this.dashbordFormBuilder.group({
      Id: new FormControl(content.Id),
      Name: new FormControl(content.Name, [Validators.required]),
      PrefectureId: new FormControl(CommonFunctions.getElementById(prefectures, content.PrefectureId)?.Id , [Validators.required]),
      
    });
  }
  onSubmit() {
    const commune = {
      Id: this.communeForm.value.Id,
      Name: this.communeForm.value.Name,
      PrefectureId: this.communeForm.value.PrefectureId,
    };
    this.store.dispatch(communeActions.createCommune({commune}));
    this.communeForm.reset();
  }

  

  deleteCommune() {
    const id = this.data.content.Id
    this.store.dispatch(communeActions.deleteCommune({id}));
  }

  editCommune(commune : Commune) {
    this.store.dispatch(communeActions.editCommune({commune}));
  }

  getNameErrorMessage() {
    if (this.communeForm.controls['Name']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.communeForm.controls['Name']!.hasError('Name') ? 'Name incorrect' : '';
  }
  getPrefectureIdErrorMessage() {
    if (this.communeForm.controls['PrefectureId']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.communeForm.controls['PrefectureId']!.hasError('PrefectureId') ? 'PrefectureId incorrect' : '';
  }

  



}