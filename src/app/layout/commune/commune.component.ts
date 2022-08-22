import { CommunesService } from 'src/app/shared/services/communes/communes.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Commune } from 'src/app/shared/models/commune';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.scss']
})

export class CommuneComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA: Commune[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  ngOnInit(): void {
    this.communeService.getAllData().subscribe(data => {
      this.ELEMENT_DATA = data;
  this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  // console.log(this.ELEMENT_DATA);
    })
  }
  displayedColumns: string[] = [ 'Name', 'PrefectureId'];
      constructor(private communeService: CommunesService, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // console.log(this.dataSource);
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
