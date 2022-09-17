import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Region } from 'src/app/shared/models/region';
import { RegionsService } from 'src/app/shared/services/regions/regions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as regionActions from '../../../store/region/region.action';
@Component({
  selector: 'app-region-dialog',
  templateUrl: './region-dialog.component.html',
  styleUrls: ['./region-dialog.component.scss']
})
export class RegionDialogComponent implements OnInit {
  regionForm!: FormGroup;
  @Output() deleteTask = new EventEmitter<any>();
  @Output() editTask = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {action: string, title: string, content: Region, isEdit: boolean },
    private dashbordFormBuilder: FormBuilder,
    private regionService: RegionsService,
    private snackBar: MatSnackBar,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    let content = {} as Region;
    this.data.isEdit ? content = this.data.content : content = {} as Region;
    this.regionForm = this.dashbordFormBuilder.group({
      Id: new FormControl(content.Id),
      Name: new FormControl(content.Name, [Validators.required]),
      
    });
  }
  onSubmit() {
    const region = {
      Id: this.regionForm.value.Id,
      Name: this.regionForm.value.Name,
    };
    this.store.dispatch(regionActions.createRegion({region}));
    this.regionForm.reset();
  }

  

  deleteRegion() {
    const id = this.data.content.Id
    this.store.dispatch(regionActions.deleteRegion({id}));
  }

  editRegion(region : Region) {
    this.store.dispatch(regionActions.editRegion({region}));
  }

  getNameErrorMessage() {
    if (this.regionForm.controls['Name']!.hasError('required')) {
      return 'Entrez une valeur';
    }
    return this.regionForm.controls['Name']!.hasError('Name') ? 'Name incorrect' : '';
  }

  



}