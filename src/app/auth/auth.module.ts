import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { GenerateVidComponent } from './generate-vid/generate-vid.component';
import { RevokeVidComponent } from './revoke-vid/revoke-vid.component';

import { RequestUinComponent } from './request-uin/request-uin.component';
import { RequestEuinComponent } from './request-euin/request-euin.component';
import { UpdateDemographicComponent } from './update-demographic/update-demographic.component';
import { ServiceReqStatusCheckComponent } from './service-req-status-check/service-req-status-check.component';
import { LockComponent } from './lock/lock.component';
import { UnlockComponent } from './unlock/unlock.component';
import { AuthHistoryComponent } from './auth-history/auth-history.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [LoginComponent, MainpageComponent, GenerateVidComponent, RevokeVidComponent, RequestUinComponent, RequestEuinComponent, UpdateDemographicComponent, ServiceReqStatusCheckComponent, LockComponent, UnlockComponent, AuthHistoryComponent],
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AuthRoutingModule, AppRoutingModule, SharedModule, NgxPaginationModule]
})
export class AuthModule {}
