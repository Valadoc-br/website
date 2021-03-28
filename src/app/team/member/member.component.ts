import {Component, Input, OnInit} from '@angular/core';

import {IconMemberComponent} from '../icon-member/icon-member.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  urlPhoto: string;
  name: string;
  bio: string;
  icons: IconMemberComponent[];

  constructor() {
    this.urlPhoto = '';
    this.name = '';
    this.bio = '';
    this.icons = [];
  }

  @Input()
  set valor(memberComponent: MemberComponent) {
    this.urlPhoto = memberComponent.urlPhoto;
    this.name = memberComponent.name;
    this.bio = memberComponent.bio;
    this.icons = memberComponent.icons;
  }

  ngOnInit(): void {
  }

}
