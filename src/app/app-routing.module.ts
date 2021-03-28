import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LearnValaComponent} from './docs/learn-vala/learn-vala.component';
import {LibrariesAndApisComponent} from './docs/libraries-and-apis/libraries-and-apis.component';
import {ValaAppsWithGtkComponent} from './docs/vala-apps-with-gtk/vala-apps-with-gtk.component';
import {TeamComponent} from './team/team.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'docs/learn-vala', component: LearnValaComponent },
  { path: 'docs/libraries-and-apis', component: LibrariesAndApisComponent },
  { path: 'docs/vala-apps-with-gtk', component: ValaAppsWithGtkComponent },
  { path: 'team', component: TeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
