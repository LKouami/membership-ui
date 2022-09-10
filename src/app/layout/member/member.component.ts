import { animate, state, style, transition, trigger } from '@angular/animations';
import { MembersService } from 'src/app/shared/services/members/members.service';
import { Component, ViewChild, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/app/shared/models/member';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';
import { CommonFunctions } from 'src/app/utils/common-functions';
import { MatSort } from '@angular/material/sort';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../store/app.state';
import { getMembers } from 'src/app/store/member/member.selector';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as memberAction from '../../store/member/member.action';

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

  members: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private store: Store
  ) { 
    // this.store.select(getMembers).pipe(
    //   takeUntil(this.destroy$)
    // ).subscribe(data => {
    //   console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    //   console.log(data);
    //   console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    //   this.dataSource.data = data.members!
    // });
    this.store.select(getMembers).subscribe(data => {
      this.dataSource.data = data.members!
    });
  //   this.store.select(getMembers)
  //     .subscribe((data) => this.initializeData(data.members!));
  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  ngOnInit() {
    console.log('ngOnInit');
    this.store.dispatch(memberAction.getMembers());
    // this.dataSource.data = this.member;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(action: string, row?: Member) {
    if (action === 'edit') {
      const dialogRef = this.dialog.open(MemberDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Modifier membre', true, '300px', row))
     }
    else if (action === 'delete') {
      const dialogRef = this.dialog.open(MemberDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Supprimer membre', false, '300px', row));
        

    } else if (action === 'add') {
      const dialogRef = this.dialog.open(MemberDialogComponent,
        CommonFunctions.getDialogConfig(action, 'Ajouter membre', false, '300px'));
      
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}





