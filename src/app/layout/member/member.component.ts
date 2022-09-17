import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/app/shared/models/member';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';
import { CommonFunctions } from 'src/app/utils/common-functions';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { getMembers } from 'src/app/store/member/member.selector';
import { Subject } from 'rxjs';
import * as memberAction from '../../store/member/member.action';
import * as communeAction from '../../store/commune/commune.action';
import { Commune } from 'src/app/shared/models/commune';
import { getCommunes } from 'src/app/store/commune/commune.selector';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MemberComponent implements OnInit {
  public dataSource = new MatTableDataSource<Member>();
  columnsToDisplay = ['Nom', 'Prenom', 'Profession', 'Commune'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'more_actions', 'expand'];
  expandedElement?: Member | null;
  public member: Member[] = [];
  public members: any[] = [];
  communes: Commune[]= [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar,
  ) { 
    this.store.select(getMembers).subscribe(data => {
      this.members = data.members!;
      this.dataSource.data = data.members!
    });
    this.store.select(getCommunes).subscribe(data => {
      this.communes = data.communes!
      this.dataSource.data = this.members;
    });

  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  ngOnInit() {
    this.store.dispatch(memberAction.getMembers());
    this.store.dispatch(communeAction.getCommunes());

  }

  getCommune(Id: string) {
    return CommonFunctions.getElementById(this.communes, Id);
   }
   getCommuneName(Id: string) {
     return this.getCommune(Id).Name;
   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(action: string, row?: Member) {
    if (action === 'edit') {
      const dialogRef = this.dialog.open(MemberDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Modifier membre', true, '300px', row, undefined,undefined,this.communes)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Membre modifié avec succès', 3, this.snackBar);
          }
        });
     }
    else if (action === 'delete') {
      const dialogRef = this.dialog.open(MemberDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Supprimer membre', false, '300px', row)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Membre supprimé avec succès', 3, this.snackBar);
          }
        });
    } else if (action === 'add') {
      const dialogRef = this.dialog.open(MemberDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Ajouter membre', false, '300px', undefined, undefined,undefined,this.communes)).afterClosed().subscribe(result => {
          if (result) {
          CommonFunctions.openSnackBar('Membre ajouté avec succès', 3, this.snackBar);
          }
        });
      
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}





