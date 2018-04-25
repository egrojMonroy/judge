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
import { HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import { WebService } from './services/web.service';
import { LoadingMaskService } from './services/loading-mask-service.service';
import { AuthorizationService } from './services/authorization.service';
import { ContestService } from './services/contest.service';
import { UploadProblemService } from './services/upload-problem.service';
import { AddTestCasesComponent } from './add-test-cases/add-test-cases.component';
import { UserProblemComponent } from './user-problem/user-problem.component';
import { UserContestComponent } from './user-contest/user-contest.component';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProblemsComponent } from './add-problems/add-problems.component';
import { MatAutocompleteModule, MatInputModule,  } from '@angular/material';
import {AutoCompleteModule} from 'primeng/autocomplete';


//RESolver find 

const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'list-problem', component: ListProblemComponent },
  { path: 'upload', component: UploadProblemComponent },
  { path: 'status', component: StatusComponent},
  { path: 'create', component: CreateComponent},
  { path: 'create-problem', component: CreateProblemComponent},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'list-contest', component: ListContestComponent },
  //Aprender a mandar id de contest, id de que posicion se va a abrir y como adjuntar el href al anterior
  { path: 'problems', component: ProblemsComponent},
  { path: 'view-problem/:id', component: ViewProblemComponent},
  { path: 'ranking', component: RankingComponent}
  // { path: '',
  //   redirectTo: '/sign-up',
  //   pathMatch: 'full'
  // }
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
    ContestCoderComponent,
    ProblemsComponent,
    RankingContestComponent,
    ViewProblemComponent,
    RankingComponent,
    AddTestCasesComponent,
    UserProblemComponent,
    UserContestComponent,
    AddProblemsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
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
    UploadProblemService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
