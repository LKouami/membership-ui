import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './layout/content/content.component';
import { MemberComponent } from './layout/member/member.component';
import { CommuneComponent } from './layout/commune/commune.component';
import { PrefectureComponent } from './layout/prefecture/prefecture.component';
import { RegionComponent } from './layout/region/region.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
const routes: Routes = [
  {
    path:'app',
    component: ContentComponent
  },
  {
    path:'membre',
    component: MemberComponent
  },
  {
    path:'commune',
    component: CommuneComponent
  },
  {
    path:'prefecture',
    component: PrefectureComponent
  },
  {
    path:'region',
    component: RegionComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
