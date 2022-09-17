import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild, OnInit,  ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Region } from 'src/app/shared/models/region';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PrefectureDialogComponent } from './prefecture-dialog/prefecture-dialog.component';
import { CommonFunctions } from 'src/app/utils/common-functions';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { getRegions } from 'src/app/store/region/region.selector';
import { Subject } from 'rxjs';
import * as regionAction from '../../store/region/region.action';
import * as prefectureAction from '../../store/prefecture/prefecture.action';
import { getPrefectures } from 'src/app/store/prefecture/prefecture.selector';
import { Prefecture } from 'src/app/shared/models/prefecture';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prefecture',
  templateUrl: './prefecture.component.html',
  styleUrls: ['./prefecture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PrefectureComponent implements OnInit {
  public dataSource = new MatTableDataSource<Prefecture>();
  columnsToDisplay = ['Nom', 'Region'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'more_actions', 'expand'];
  expandedElement?: Prefecture | null;
  public prefecture: Prefecture[] = [];
  public prefectures: Prefecture[] = [];
  regions: Region[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar,
  ) { 
    this.store.select(getPrefectures).subscribe(data => {
      this.prefectures = data.prefectures!;
      this.dataSource.data = this.prefectures;
    });
    this.store.select(getRegions).subscribe(data => {
      this.regions = data.regions!
      this.dataSource.data = this.prefectures;
    });
  
  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  ngOnInit() {
    this.store.dispatch(prefectureAction.getPrefectures());
    this.store.dispatch(regionAction.getRegions());
  }
  getRegion(Id: string) {
   return CommonFunctions.getElementById(this.regions, Id);
  }
  getRegionName(Id: string) {
    return this.getRegion(Id).Name;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(action: string, row?: Prefecture) {
    if (action === 'edit') {
      const dialogRef = this.dialog.open(PrefectureDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Modifier prefecture', true, '300px', row,undefined,this.regions)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Préfecture modifié avec succès', 3, this.snackBar);
          }
        });
     }
    else if (action === 'delete') {
      const dialogRef = this.dialog.open(PrefectureDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Supprimer prefecture', false, '300px', row)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Préfecture supprimée avec succès', 3, this.snackBar);
          }
        });
        

    } else if (action === 'add') {
      const dialogRef = this.dialog.open(PrefectureDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Ajouter prefecture', false, '300px',undefined, undefined,this.regions)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Préfecture ajoutée avec succès', 3, this.snackBar);
          }
        });
      
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}





