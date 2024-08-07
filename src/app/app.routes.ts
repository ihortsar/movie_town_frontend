import { Routes } from '@angular/router';
import { SignInComponent } from './auth-components/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './auth-components/sign-up/sign-up.component';
import { MyCabinetComponent } from './cabinet/my-cabinet/my-cabinet.component';
import { AuthGuard } from './auth.guard';
import { SignOutComponent } from './auth-components/sign-out/sign-out.component';
import { ImprintComponent } from './legal/imprint/imprint.component';
import { DataProtectComponent } from './legal/data-protect/data-protect.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'signout', component: SignOutComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'my-area', component: MyCabinetComponent, canActivate: [AuthGuard] },
    { path: 'imprint', component: ImprintComponent, canActivate: [AuthGuard] },
    { path: 'date-protect', component: DataProtectComponent, canActivate: [AuthGuard] },

];
