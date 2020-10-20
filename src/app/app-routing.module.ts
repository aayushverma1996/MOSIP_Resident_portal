import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FaqComponent } from './core/faq/faq.component';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { ContactComponent } from './core/contact/contact.component';
import { ParentComponent } from './shared/parent/parent.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { GenerateVidComponent } from './auth/generate-vid/generate-vid.component';
import { RevokeVidComponent } from "./auth/revoke-vid/revoke-vid.component";
import { RequestUinComponent } from './auth/request-uin/request-uin.component';
import { RequestEuinComponent } from './auth/request-euin/request-euin.component';
import { UpdateDemographicComponent } from './auth/update-demographic/update-demographic.component';
import { ServiceReqStatusCheckComponent } from './auth/service-req-status-check/service-req-status-check.component';
import { LockComponent } from './auth/lock/lock.component';
import { UnlockComponent } from './auth/unlock/unlock.component';
import { AuthHistoryComponent } from "./auth/auth-history/auth-history.component";
import { UpdatedemoComponent } from './feature/updatedemo/updatedemo.component';

/**
 * @description These are the routes.
 */
const appRoutes: Routes = [
  
  { path: 'dashboard', loadChildren: './feature/dashboard/dashboard.module#DashboardModule' },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'updatedemo', component: UpdatedemoComponent},
  { path: 'bookmodifyappointment', component: LoginComponent},
   { path: 'generateVid', component: GenerateVidComponent},
   { path: 'revokeVid', component: RevokeVidComponent},
   { path: 'servReqCheckStatus', component: ServiceReqStatusCheckComponent},
   { path: 'requestUin', component: RequestUinComponent },
   { path: 'requestEuin', component: RequestEuinComponent},
   { path: 'updateDemograhic', component: UpdateDemographicComponent},
   {path:'lock',component: LockComponent},
   {path:'unlock',component: UnlockComponent},
  
   {path:'authHistory',component: AuthHistoryComponent},

  {
    path: 'pre-registration',
    component: ParentComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/' },
      { path: 'demographic', loadChildren: './feature/demographic/demographic.module#DemographicModule' },
      { path: 'file-upload', loadChildren: './feature/file-upload/file-upload.module#FileUploadModule' },
      { path: 'summary', loadChildren: './feature/summary/summary.module#SummaryModule' },
      { path: 'booking', loadChildren: './feature/booking/booking.module#BookingModule' }
    ]
  }
];

/**
 * @author Shashank Agrawal
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
