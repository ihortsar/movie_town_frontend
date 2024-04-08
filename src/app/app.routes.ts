import { Routes } from '@angular/router';
import { SignInComponent } from './auth-components/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './auth-components/sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'login', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'home', component: HomeComponent },

];
