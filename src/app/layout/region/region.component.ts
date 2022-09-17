import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild, OnInit,  ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Region } from 'src/app/shared/models/region';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { RegionDialogComponent } from './region-dialog/region-dialog.component';
import { CommonFunctions } from 'src/app/utils/common-functions';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { getRegions } from 'src/app/store/region/region.selector';
import { Subject } from 'rxjs';
import * as regionAction from '../../store/region/region.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RegionComponent implements OnInit {
  public dataSource = new MatTableDataSource<Region>();
  columnsToDisplay = ['Nom'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'more_actions', 'expand'];
  expandedElement?: Region | null;
  public region: Region[] = [];

  regions: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar,
  ) { 
    this.store.select(getRegions).subscribe(data => {
      this.dataSource.data = data.regions!
    });
  
  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  ngOnInit() {
    this.store.dispatch(regionAction.getRegions());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(action: string, row?: Region) {
    if (action === 'edit') {
      const dialogRef = this.dialog.open(RegionDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Modifier region', true, '300px', row)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Région modifié avec succès', 3, this.snackBar);
          }
        });
     }
    else if (action === 'delete') {
      const dialogRef = this.dialog.open(RegionDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Supprimer region', false, '300px', row)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Région supprimé avec succès', 3, this.snackBar);
          }
        });
        

    } else if (action === 'add') {
      const dialogRef = this.dialog.open(RegionDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Ajouter region', false, '300px')).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Région ajouté avec succès', 3, this.snackBar);
          }
        });
      
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}





