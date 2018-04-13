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
import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'list-problem', component: ListProblemComponent },
  { path: 'upload', component: UploadProblemComponent },
  { path: 'status', component: StatusComponent},
  { path: 'create', component: CreateComponent},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'list-contest', component: ListContestComponent },
  { path: 'ranking', component: UploadProblemComponent},
  
  { path: '',
    redirectTo: '/sign-up',
    pathMatch: 'full'
  }
];
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
    CreateContestComponent
  ],
  imports: [
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
