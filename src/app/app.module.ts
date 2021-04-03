import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LearnValaComponent } from './docs/learn-vala/learn-vala.component';
import { ValaAppsWithGtkComponent } from './docs/vala-apps-with-gtk/vala-apps-with-gtk.component';
import { LibrariesAndApisComponent } from './docs/libraries-and-apis/libraries-and-apis.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { TeamComponent } from './team/team.component';
import { MemberComponent } from './team/member/member.component';
import { IconMemberComponent } from './team/icon-member/icon-member.component';
import { TeamService } from './team/team.service';
import { TerminalComponent } from './home/terminal/terminal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LearnValaComponent,
    ValaAppsWithGtkComponent,
    LibrariesAndApisComponent,
    NavComponent,
    FooterComponent,
    TeamComponent,
    MemberComponent,
    IconMemberComponent,
    TerminalComponent,
    SidebarComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
