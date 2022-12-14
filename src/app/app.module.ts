import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { RegionComponent } from './layout/region/region.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ContentComponent } from './layout/content/content.component';
import { PresentationComponent } from './layout/presentation/presentation.component';
import { MemberComponent } from './layout/member/member.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table' ;
import {MatSortModule} from '@angular/material/sort';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { DashboardDialogComponent } from './layout/dashboard/dashboard-dialog/dashboard-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MemberDialogComponent } from './layout/member/member-dialog/member-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import * as memberReducer from './store/member/member.reducer';
import { MemberEffect } from './store/member/member.effect';
import { reducers, metaReducers } from './store/app.state';
import { RegionDialogComponent } from './layout/region/region-dialog/region-dialog.component';
import { RegionEffect } from './store/region/region.effect';
import { CommuneComponent } from './layout/commune/commune.component';
import { CommuneDialogComponent } from './layout/commune/commune-dialog/commune-dialog.component';
import { CommuneEffect } from './store/commune/commune.effect';
import { PrefectureEffect } from './store/prefecture/prefecture.effect';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PrefectureComponent } from './layout/prefecture/prefecture.component';
import { PrefectureDialogComponent } from './layout/prefecture/prefecture-dialog/prefecture-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContentComponent,
    PresentationComponent,
    MemberComponent,
    DashboardComponent,
    DashboardDialogComponent,
    MemberDialogComponent,
    RegionComponent,
    RegionDialogComponent,
    CommuneComponent,
    CommuneDialogComponent,
    PrefectureComponent,
    PrefectureDialogComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    // ngrx related imports
    StoreModule.forRoot(reducers,{metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([MemberEffect, RegionEffect,CommuneEffect,PrefectureEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
