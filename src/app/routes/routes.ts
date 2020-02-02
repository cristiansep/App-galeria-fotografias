import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { AdminComponent } from '../components/admin/admin.component';
import { ListComponent } from '../components/list/list.component';
import { GuardService } from '../services/guard.service';
import { NuevaFotografiaComponent } from '../components/nueva-fotografia/nueva-fotografia.component';
import { EditarFotografiaComponent } from '../components/editar-fotografia/editar-fotografia.component';

const appRoutes: Routes = [
    { path: 'home/:num', component: HomeComponent },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [GuardService],
        children: [
            { path: 'list', component: ListComponent },
             { path: 'new', component: NuevaFotografiaComponent },
             { path: 'edit/:id', component: EditarFotografiaComponent }
        ]
    },


    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'home/1', pathMatch: 'full' }
    // { path: '**', component: HomeComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });