import {Component, OnInit} from '@angular/core';

import {MemberComponent} from './member/member.component';
import {TeamService} from './team.service';
import {IconMemberComponent, Type} from './icon-member/icon-member.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  members: MemberComponent[];

  constructor(private teamService: TeamService) {
    this.members = [];
    let counter = 0;
    const membersService = this.teamService.getTeam();

    function mountIconMember(title: string, href: string, type: Type){
      const iconMemberComponent = new IconMemberComponent();
      iconMemberComponent.title = title;
      iconMemberComponent.href = href;
      iconMemberComponent.type = type;
      return iconMemberComponent;
    }

    for(const memberService in membersService) {
      const memberComponent = new MemberComponent();
      memberComponent.urlPhoto = membersService[counter].urlPhoto;
      memberComponent.name = membersService[counter].name;
      memberComponent.bio = membersService[counter].bio;
      this.members.push(memberComponent);

      const icons = membersService[counter].icons[0];

      if (icons.facebook.length > 0){
        memberComponent.icons.push(mountIconMember('Facebook', icons.facebook, Type.FACEBOOK));
      }

      if (icons.twitter.length > 0){
        memberComponent.icons.push(mountIconMember('Twitter', icons.twitter, Type.TWITTER));
      }

      if (icons.github.length > 0){
        memberComponent.icons.push(mountIconMember('Github', icons.github, Type.GITHUB));
      }

      if (icons.linkedin.length > 0){
        memberComponent.icons.push(mountIconMember('Linkedin', icons.linkedin, Type.LINKEDIN));
      }

      if (icons.telegram.length > 0){
        memberComponent.icons.push(mountIconMember('Telegram', icons.telegram, Type.TELEGRAM));
      }

      console.log(counter);
      console.log(memberComponent);
      counter++;
    }
  }

  ngOnInit(): void {
  }

}
