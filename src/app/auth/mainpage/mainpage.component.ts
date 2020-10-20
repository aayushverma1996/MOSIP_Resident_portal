import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';


import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { DialougComponent } from 'src/app/shared/dialoug/dialoug.component';
import { Subscription, range } from 'rxjs';
import LanguageFactory from 'src/assets/i18n';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { ConfigService } from 'src/app/core/services/config.service';
import * as appConstants from '../../app.constants';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
