import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Region } from 'src/app/shared/models/region';
import { PrefecturesService } from 'src/app/shared/services/prefectures/prefectures.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as prefectureActions from '../../../store/prefecture/prefecture.action';
import { Prefecture } from 'src/app/shared/models/prefecture';
import { CommonFunctions } from 'src/app/utils/common-functions';
@Component({
  selector: 'app-prefecture-dialog',
  templateUrl: './prefecture-dialog.component.html',
  styleUrls: ['./prefecture-dialog.component.scss']
})
export class PrefectureDialogComponent implements OnInit {
  prefectureForm!: FormGroup;
  @Output() deleteTask = new EventEmitter<any>();
  @Output() editTask = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {action: string, title: string, content: Prefecture, isEdit: boolean , regions:Region[]},
    private dashbordFormBuilder: FormBuilder,
    private prefectureService: PrefecturesService,
    private snackBar: MatSnackBar,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    let content = {} as Prefecture;
    let regions: Region[] = [];
    this.data.isEdit ? content = this.data.content  : content = {} as Prefecture;
    this.data.isEdit ? regions = this.data.regions  : regions = [] as Region[];
    this.prefectureForm = this.dashbordFormBuilder.group({
      Id: new FormControl(content.Id),
      Name: new FormControl(content.Name, [Validators.required]),
      RegionId: new FormControl(CommonFunctions.getElementById(regions, content.RegionId)?.Id , [Validators.required]),
      
    });
  }
  onSubmit() {
    const prefecture = {
      Id: this.prefectureForm.value.Id,
      Name: this.prefectureForm.value.Name,
      RegionId: this.prefectureForm.value.RegionId,
    };
    this.store.dispatch(prefectureActions.createPrefecture({prefecture}));
    this.prefectureForm.reset();
  }

  

  deletePrefecture() {
    const id = this.data.content.Id
    this.store.dispatch(prefectureActions.deletePrefecture({id}));
  }

  editPrefecture(prefecture : Prefecture) {
    this.store.dispatch(prefectureActions.editPrefecture({prefecture}));
  }

  getNameErrorMessage() {
    if (this.prefectureForm.controls['Name']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.prefectureForm.controls['Name']!.hasError('Name') ? 'Name incorrect' : '';
  }
  getRegionIdErrorMessage() {
    if (this.prefectureForm.controls['RegionId']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.prefectureForm.controls['RegionId']!.hasError('RegionId') ? 'RegionId incorrect' : '';
  }

  



}