import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { DialougComponent } from 'src/app/shared/dialoug/dialoug.component';
import { Subscription, range } from 'rxjs';
import LanguageFactory from 'src/assets/i18n';
import { DataStorageService } from '../services/data-storage.service';
import { ConfigService } from '../services/config.service';
import * as appConstants from '../../app.constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  flag = false;
  secondaryLangFromConfig = '';
  primaryLangFromConfig = '';
  primaryLang = '';
  secondaryLang = '';
  validationMessages = {};
  selectedLanguage = '';
  languages: string[] = [];
  dir = '';
  defaultLangCode = appConstants.DEFAULT_LANG_CODE;
  secondaryDir = '';
  textDir = localStorage.getItem('dir');
  LANGUAGE_ERROR_TEXT =
    'The system has encountered a technical error. Administrator to setup the necessary language configuration(s)';

  subscription: Subscription;
  constructor(
    public  authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog,
    private dataService: DataStorageService,
    private configService: ConfigService,

  ) {
    this.translate.use(localStorage.getItem('langCode'));
    localStorage.clear();
  }

  ngOnInit() {
    this.subscription = this.authService.myProp$.subscribe(res => {
      this.flag = res;
    });
    localStorage.setItem('langCode','eng');
    this.loadConfigs();
    
  }
  loadConfigs() {
    this.dataService.getConfig().subscribe(
      response => {
        this.configService.setConfig(response);
       // console.log(response);
        this.loadLanguagesWithConfig();
      },
      error => {
        this.showErrorMessage();
      }
    );
  }
  loadLanguagesWithConfig() {
    this.primaryLangFromConfig = this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_primary_language);
    this.secondaryLangFromConfig = this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_secondary_language);

    // default secondary language if any of the primary or secondary langugae is not present
    // this.primaryLangFromConfig === ''
    //   ? (this.primaryLangFromConfig = this.defaultLangCode)
    //   : this.primaryLangFromConfig;
    // this.secondaryLangFromConfig === ''
    //   ? (this.secondaryLangFromConfig = this.defaultLangCode)
    //   : this.secondaryLangFromConfig;

    if (
      !this.primaryLangFromConfig ||
      !this.secondaryLangFromConfig ||
      this.primaryLangFromConfig === '' ||
      this.secondaryLangFromConfig === ''
    ) {
      const message = {
        case: 'MESSAGE',
        message: this.LANGUAGE_ERROR_TEXT
      };
      this.dialog.open(DialougComponent, {
        width: '350px',
        data: message,
        disableClose: true
      });
    }

    this.primaryLang = this.primaryLangFromConfig;
    this.secondaryLang = this.secondaryLangFromConfig;

    this.setLanguageDirection(this.primaryLangFromConfig, this.secondaryLangFromConfig);
    localStorage.setItem('langCode', this.primaryLangFromConfig);
    localStorage.setItem('secondaryLangCode', this.secondaryLangFromConfig);
    localStorage.setItem('langCode', 'eng');
    localStorage.setItem('secondaryLangCode', 'eng');
    this.translate.use(this.primaryLang);
    this.selectedLanguage = appConstants.languageMapping[this.primaryLang].langName;
    if (
      appConstants.languageMapping[this.primaryLangFromConfig] &&
      appConstants.languageMapping[this.secondaryLangFromConfig]
    ) {
      this.languages.push(appConstants.languageMapping[this.primaryLangFromConfig].langName);
      this.languages.push(appConstants.languageMapping[this.secondaryLangFromConfig].langName);
    }
    this.translate.addLangs([this.primaryLangFromConfig, this.secondaryLangFromConfig]);
    this.loadValidationMessages();
  }
  

  setLanguageDirection(primaryLang: string, secondaryLang: string) {
    const ltrLangs = this.configService
      .getConfigByKey(appConstants.CONFIG_KEYS.mosip_left_to_right_orientation)
      .split(',');
    if (ltrLangs.includes(primaryLang)) {
      this.dir = 'ltr';
    } else {
      this.dir = 'rtl';
    }
    if (ltrLangs.includes(secondaryLang)) {
      this.secondaryDir = 'ltr';
    } else {
      this.secondaryDir = 'rtl';
    }
    localStorage.setItem('dir', this.dir);
    localStorage.setItem('secondaryDir', this.secondaryDir);
    this.textDir = localStorage.getItem('dir');
    
  }
  changeLanguage(): void {
    if (this.selectedLanguage !== appConstants.languageMapping[this.primaryLangFromConfig].langName) {
      this.secondaryLang = this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_primary_language);
      this.primaryLang = this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_secondary_language);

      this.setLanguageDirection(this.primaryLang, this.secondaryLang);
      localStorage.setItem('langCode', this.primaryLang);
      localStorage.setItem('secondaryLangCode', this.secondaryLang);
    } else {
      this.primaryLang = this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_primary_language);
      this.secondaryLang = this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_secondary_language);

      this.setLanguageDirection(this.primaryLang, this.secondaryLang);
      localStorage.setItem('langCode', this.primaryLang);
      localStorage.setItem('secondaryLangCode', this.secondaryLang);
    }

    this.translate.use(localStorage.getItem('langCode'));
    this.loadValidationMessages();
  }
  loadValidationMessages() {
    let factory = new LanguageFactory(localStorage.getItem('langCode'));
    let response = factory.getCurrentlanguage();
    this.validationMessages = response['header'];
    //  const route_parts= this.router.url.split('/');
    //  let url= route_parts[route_parts.length-2]+"/"+route_parts[route_parts.length-1];
    //  console.log(url);
    // this.router.navigate(['faq']);
  }
  showErrorMessage() {
    let factory = new LanguageFactory(localStorage.getItem('langCode'));
    let response = factory.getCurrentlanguage();
    let errormessage = response['error']['error'];
    const message = {
      case: 'MESSAGE',
      message: errormessage
    };
    this.dialog.open(DialougComponent, {
      width: '350px',
      data: message
    });
  }

  onLogoClick() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['src/app/auth/mainpage']);
    } else {
      this.router.navigate(['/']);
    }
  }

  onHome() {
    let homeURL = '';
    homeURL = 'dashboard';
    this.router.navigate([homeURL]);
  }

  async doLogout() {
    await this.showMessage();
  }

  showMessage() {
    let factory = new LanguageFactory(localStorage.getItem('langCode'));
    let response = factory.getCurrentlanguage();
    const secondaryLanguagelabels = response['bookModifyAppointment']['logout_msg'];
    localStorage.removeItem('loggedOutLang');
    localStorage.removeItem('loggedOut');
    const data = {
      case: 'MESSAGE',
      message: secondaryLanguagelabels
    };
    this.dialog
      .open(DialougComponent, {
        width: '350px',
        data: data
      })
      .afterClosed()
      .subscribe(() => this.authService.onLogout());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
