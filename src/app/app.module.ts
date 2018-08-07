import { UpdateContestComponent } from './update-contest/update-contest.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateProblemComponent } from './create-problem/create-problem.component';
import { StatusComponent } from './status/status.component';
import { UploadProblemComponent } from './upload-problem/upload-problem.component';
import { ListProblemComponent } from './list-problem/list-problem.component';
import { ListContestComponent } from './list-contest/list-contest.component';
import { TabsModule } from 'ngx-bootstrap';
import { CreateComponent } from './create/create.component';
import { CreateContestComponent } from './create-contest/create-contest.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContestCoderComponent } from './contest-coder/contest-coder.component';
import { ProblemsComponent } from './problems/problems.component';
import { RankingContestComponent } from './ranking-contest/ranking-contest.component';
import { ViewProblemComponent } from './view-problem/view-problem.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RankingComponent } from './ranking/ranking.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import { WebService } from './services/web.service';
import { LoadingMaskService } from './services/loading-mask-service.service';
import { AuthorizationService } from './services/authorization.service';
import { ContestService } from './services/contest.service';
import { UploadProblemService } from './services/upload-problem.service';
import { TestCaseService } from './services/test-case.service';
import { AddTestCasesComponent } from './add-test-cases/add-test-cases.component';
import { UserProblemComponent } from './user-problem/user-problem.component';
import { UserContestComponent } from './user-contest/user-contest.component';
import { CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProblemsComponent } from './add-problems/add-problems.component';
import { MatAutocompleteModule, MatInputModule,  } from '@angular/material';
import { AutoCompleteModule} from 'primeng/autocomplete';
import { StatusService } from './services/status.service';
import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordService } from './services/reset-password.service';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { AuthGuard } from './../guards/auth.guard';
import { AdminGuard } from './../guards/admin.guard';
import { TeacherGuard } from './../guards/teacher.guard';
import { UserGuard } from './../guards/user.guard';
import { UpdateProblemComponent } from './update-problem/update-problem.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/list-contest', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'list-problem', component: ListProblemComponent },
  { path: 'upload/:id', component: UploadProblemComponent, canActivate: [AuthGuard] },
  { path: 'status', component: StatusComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
  { path: 'create-problem', component: CreateProblemComponent, canActivate: [AdminGuard, AuthGuard]},
  { path: 'create-contest', component: CreateContestComponent, canActivate: [AuthGuard]},
  { path: 'create-problem/:id', component: UpdateProblemComponent, canActivate: [AdminGuard, AuthGuard]},
  { path: 'create-contest/:id', component: UpdateContestComponent, canActivate: [AuthGuard]},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'list-contest', component: ListContestComponent },
  { path: 'problems', component: ListProblemComponent},
  { path: 'view-contest', component: ProblemsComponent, canActivate: [AuthGuard]},
  { path: 'view-problem/:id', component: ViewProblemComponent },
  { path: 'view-contest/:id', component: ContestCoderComponent, canActivate: [AuthGuard]},
  { path: 'ranking', component: RankingComponent},
  { path: 'users', component: UserComponent , canActivate: [AdminGuard]},
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'activateaccount', component: ActivateAccountComponent}
];

export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, loadingMaskService: LoadingMaskService) {
  return new WebService(backend, defaultOptions, loadingMaskService);
}


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavbarComponent,
    SignUpComponent,
    CreateProblemComponent,
    StatusComponent,
    UploadProblemComponent,
    ListProblemComponent,
    ListContestComponent,
    CreateComponent,
    CreateContestComponent,
    UpdateContestComponent,
    UpdateProblemComponent,
    ContestCoderComponent,
    ProblemsComponent,
    RankingContestComponent,
    ViewProblemComponent,
    RankingComponent,
    AddTestCasesComponent,
    UserProblemComponent,
    UserContestComponent,
    AddProblemsComponent,
    UserComponent,
    ResetPasswordComponent,
    ActivateAccountComponent
  ],
  imports: [
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
     // { enableTracing: true } // <-- debugging purposes only
    ),
    PaginationModule.forRoot(),
    FormsModule,
    BrowserModule,
    TabsModule.forRoot(),
    PdfViewerModule,
    HttpModule,
    CalendarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    AutoCompleteModule
  ],
  providers: [
    WebService,
    LoadingMaskService,
    {
      provide: WebService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoadingMaskService]
    },
    AuthorizationService,
    ContestService,
    UploadProblemService,
    TestCaseService,
    StatusService,
    UserService,
    ResetPasswordService,
    AuthGuard,
    UserGuard,
    TeacherGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
