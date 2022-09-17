import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild, OnInit,  ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Commune } from 'src/app/shared/models/commune';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CommuneDialogComponent } from './commune-dialog/commune-dialog.component';
import { CommonFunctions } from 'src/app/utils/common-functions';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { getCommunes } from 'src/app/store/commune/commune.selector';
import { Subject } from 'rxjs';
import * as communeAction from '../../store/commune/commune.action';
import * as prefectureAction from '../../store/prefecture/prefecture.action';
import { getPrefectures } from 'src/app/store/prefecture/prefecture.selector';
import { Prefecture } from 'src/app/shared/models/prefecture';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CommuneComponent implements OnInit {
  public dataSource = new MatTableDataSource<Commune>();
  columnsToDisplay = ['Nom', 'Prefecture'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'more_actions', 'expand'];
  expandedElement?: Commune | null;
  public commune: Commune[] = [];
  public prefectures: Prefecture[] = [];
  

  communes: Commune[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar,
  ) { 
    this.store.select(getCommunes).subscribe(data => {
      this.communes = data.communes!;
      this.dataSource.data = this.communes;
    });
    this.store.select(getPrefectures).subscribe(data => {
      this.prefectures = data.prefectures!
      this.dataSource.data = this.communes;
    });
  
  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  ngOnInit() {
    this.store.dispatch(communeAction.getCommunes());
    this.store.dispatch(prefectureAction.getPrefectures());
  }
  getPrefecture(Id: string) {
   return CommonFunctions.getElementById(this.prefectures, Id);
  }
  getPrefectureName(Id: string) {
    return this.getPrefecture(Id).Name;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(action: string, row?: Commune) {
    if (action === 'edit') {
      const dialogRef = this.dialog.open(CommuneDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Modifier commune', true, '300px', row, this.prefectures)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Commune modifiée avec succès', 3, this.snackBar);
          }
        });
     }
    else if (action === 'delete') {
      const dialogRef = this.dialog.open(CommuneDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Supprimer commune', false, '300px', row)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Commune supprimée avec succès', 3, this.snackBar);
          }
        });
        

    } else if (action === 'add') {
      const dialogRef = this.dialog.open(CommuneDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Ajouter commune', false, '300px',undefined, this.prefectures)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Commune ajoutée avec succès', 3, this.snackBar);
          }
        });
      
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}





