import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  language = 'pt_BR';

  constructor(private translate: TranslateService) {
    this.translate = translate;
  }

  ngOnInit(): void {
  }

  changeLang(event: any) {
    this.language = event.target.value;
    this.translate.setDefaultLang(this.language);
  }
}
