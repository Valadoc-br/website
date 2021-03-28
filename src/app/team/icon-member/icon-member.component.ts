import {Component, Input, OnInit} from '@angular/core';

export enum Type {
  FACEBOOK,
  TWITTER,
  GITHUB,
  LINKEDIN,
  TELEGRAM
};

@Component({
  selector: 'app-icon-member',
  templateUrl: './icon-member.component.html',
  styleUrls: ['./icon-member.component.css']
})
export class IconMemberComponent implements OnInit {

  title: string;
  href: string;
  target: string;
  type: Type;

  constructor() {
    this.title = '';
    this.href = '';
    this.target = '_blank';
    this.type = Type.TELEGRAM;
  }

  @Input()
  set valor(iconMemberComponent: IconMemberComponent ) {
    this.title = iconMemberComponent.title;
    this.href = iconMemberComponent.href;
    this.target = iconMemberComponent.target;
    this.type = iconMemberComponent.type;
  }

  ngOnInit(): void {
  }

}
