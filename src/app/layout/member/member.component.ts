import {animate, state, style, transition, trigger} from '@angular/animations';
import { MembersService } from 'src/app/shared/services/members/members.service';
import { Component, ViewChild,OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Member } from 'src/app/shared/models/member';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';
import { CommonFunctions } from 'src/app/utils/common-functions';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export  class MemberComponent implements OnInit {
  dataSource = new MatTableDataSource<Member>();
  columnsToDisplay = ['Nom', 'Prenom', 'Profession', 'Commune'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,'more_actions', 'expand'];
  expandedElement?: Member | null;
  ELEMENT_DATA: Member[] = []

  constructor(
    public dialog: MatDialog,
    private memberService: MembersService
  ) { }
  ngOnInit() {
    this.memberService.getAllData().subscribe(data => {
            this.ELEMENT_DATA = data;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        console.log(this.dataSource)
          })
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  } 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(action: string, row: Member) {
    if(action === 'edit') {
    const dialogRef = this.dialog.open(MemberDialogComponent, 
      CommonFunctions.getDialogConfig(row, 'Modifier membre', true, '300px'));
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    }
     else if(action === 'delete') {
      const dialogRef = this.dialog.open(MemberDialogComponent, 
        CommonFunctions.getDialogConfig(row, 'Supprimer membre', false, '300px'));
    }
  }
}





