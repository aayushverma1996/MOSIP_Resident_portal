import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialougComponent } from 'src/app/shared/dialoug/dialoug.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth.service';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { ConfigService } from 'src/app/core/services/config.service';
import * as appConstants from '../../app.constants';
import LanguageFactory from '../../../assets/i18n';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  inputPlaceholderContact = 'Email ID or Phone Number';
  inputPlaceholderOTP = 'Enter OTP';
  disableBtn = false;
  timer:any ;
  inputOTP: string;
  inputContactDetails = '';
  showSendOTP = true;
  showResend = false;
  showVerify = false;
  showContactDetails = true;
  showOTP = false;
  disableVerify = false;
  secondaryLanguagelabels: any;
  loggedOutLang: string;
  contactErrorMessage: string;
  uinErrorMessage: string;
  minutes: string;
  seconds: string;
  showSpinner = true;
  selectedLanguage= '';
  validationMessages = {};
  servicesActivationStatus: boolean[] = [];
  activatedServiceJSON={};
  inputUinDetails = '';
  showUinDetail = true;


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private dialog: MatDialog,
    private dataService: DataStorageService,
    private regService: RegistrationService,
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
     // this.setServiceId();  
     this.setTimer();
      this.loadValidationMessages();
        
      if (this.authService.isAuthenticated()) {
        this.authService.onLogout();
      }
  }

  loadValidationMessages() {
    let langCode=localStorage.getItem('langCode');
    this.selectedLanguage = appConstants.languageMapping[langCode].langName;
    let factory = new LanguageFactory(langCode);
    let response = factory.getCurrentlanguage();
    this.validationMessages = response['authValidationMessages'];

    this.showSpinner=false;
  }

  loginIdValidator() {
    this.contactErrorMessage = undefined;
    const modes = this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_login_mode);
    const emailRegex = new RegExp(this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_regex_email));
    const phoneRegex = new RegExp(this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_regex_phone));
    if (modes === 'email,mobile') {
      if (!(emailRegex.test(this.inputContactDetails) || phoneRegex.test(this.inputContactDetails))) {
        this.contactErrorMessage = this.validationMessages['invalidInput'];
      }
    } else if (modes === 'email') {
      if (!emailRegex.test(this.inputContactDetails)) {
        this.contactErrorMessage = this.validationMessages['invalidEmail'];
      }
    } else if (modes === 'mobile') {
      if (!phoneRegex.test(this.inputContactDetails)) {
        this.contactErrorMessage = this.validationMessages['invalidMobile'];
      }
    }
  }

  setTimer() {
    const time = Number(this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_kernel_otp_expiry_time));
    if (!isNaN(time)) {
      const minutes = time / 60;
      const seconds = time % 60;
      if (minutes < 10) {
        this.minutes = '0' + minutes;
      } else {
        this.minutes = String(minutes);
      }
      if (seconds < 10) {
        this.seconds = '0' + seconds;
      } else {
        this.seconds = String(seconds);
      }
    } else {
      this.minutes = '02';
      this.seconds = '00';
    }
  }

  showVerifyBtn() {
    if (
      this.inputOTP.length ===
      Number(this.configService.getConfigByKey(appConstants.CONFIG_KEYS.mosip_kernel_otp_default_length))
    ) {
      this.showVerify = true;
      this.showResend = false;
    } else {
      this.showResend = true;
      this.showVerify = false;
    }
  }

  submit(): void {  
      this.loginIdValidator();
  

  if ((this.showSendOTP || this.showResend) && this.contactErrorMessage === undefined)  {
      this.inputOTP = '';
      this.showResend = true;
      this.showOTP = true;
      this.showSendOTP = false;
      this.showContactDetails = false;

      const timerFn = () => {
        let secValue = Number(document.getElementById('secondsSpan').innerText);
        const minValue = Number(document.getElementById('minutesSpan').innerText);

        if (secValue === 0) {
          secValue = 60;
          if (minValue === 0) {
            // redirecting to initial phase on completion of timer
            this.showContactDetails = true;
            this.showSendOTP = true;
            this.showResend = false;
            this.showOTP = false;
            this.showVerify = false;
            this.showUinDetail = true;
            document.getElementById('minutesSpan').innerText = this.minutes;
            document.getElementById('timer').style.visibility = 'hidden';
            clearInterval(this.timer);
            return;
          }
          document.getElementById('minutesSpan').innerText = '0' + (minValue - 1);
        }

        if (secValue === 10 || secValue < 10) {
          document.getElementById('secondsSpan').innerText = '0' + --secValue;
        } else {
          document.getElementById('secondsSpan').innerText = --secValue + '';
        }
      };

      // update of timer value on click of resend
      if (document.getElementById('timer').style.visibility === 'visible') {
        document.getElementById('secondsSpan').innerText = this.seconds;
        document.getElementById('minutesSpan').innerText = this.minutes;
      } else {
        // initial set up for timer
        document.getElementById('timer').style.visibility = 'visible';
        this.timer = setInterval(timerFn, 1000);
      }
      
        this.dataService.sendOtp(this.inputContactDetails).subscribe(response => {});
      // dynamic update of button text for Resend and Verify
    } else if (this.showVerify && this.contactErrorMessage === undefined) {
      this.disableVerify = true;
        this.preRegLogin();
    }
  
}
  preRegLogin(){

    this.dataService.verifyOtp(this.inputContactDetails, this.inputOTP).subscribe(
      response => {
        if (!response['errors']) {
          clearInterval(this.timer);
          localStorage.setItem('loggedIn', 'true');
          this.authService.setToken();
          this.regService.setLoginId(this.inputContactDetails);
          this.disableVerify = false;
          this.router.navigate(['dashboard']);
        } else {
          this.disableVerify = false;
          this.showOtpMessage();
        }
      },
      error => {
        this.disableVerify = false;
        this.showErrorMessage();
      }
    );
    
    }

  showOtpMessage() {
    this.inputOTP = '';
    let factory = new LanguageFactory(localStorage.getItem('langCode'));
    let response = factory.getCurrentlanguage();
    let otpmessage = response['message']['login']['msg3'];
    const message = {
      case: 'MESSAGE',
      message: otpmessage
    };
    this.dialog.open(DialougComponent, {
      width: '350px',
      data: message
    });
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
  ngOnDestroy(){
    // console.log("component changed");
     clearInterval(this.timer);
   }
}
