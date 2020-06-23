import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { AuthGuard } from './seguranca/auth.guard';
import { EquipeListComponent } from './equipe/equipe-list/equipe-list.component';
import { FeriasListComponent } from './ferias/ferias-list/ferias-list.component';
import { FuncionarioListComponent } from './funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioDetailComponent } from './funcionario/funcionario-detail/funcionario-detail.component';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { EquipeDetailComponent } from './equipe/equipe-detail/equipe-detail.component';
import { FeriasDetailComponent } from './ferias/ferias-detail/ferias-detail.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [

  { path: '', component: PrincipalComponent, canActivate: [AuthGuard] },

  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: 'equipes', component: EquipeListComponent, canActivate: [AuthGuard] },
  { path: 'equipes/equipe-detail', component: EquipeDetailComponent, canActivate: [AuthGuard] },
  { path: 'equipes/:codigo', component: EquipeDetailComponent, canActivate: [AuthGuard] },

  { path: 'funcionarios',  component: FuncionarioListComponent, canActivate: [AuthGuard] },
  { path: 'funcionarios/funcionario-detail',  component: FuncionarioDetailComponent, canActivate: [AuthGuard] },
  { path: 'funcionarios/:codigo',  component: FuncionarioDetailComponent, canActivate: [AuthGuard] },

  { path: 'ferias',  component: FeriasListComponent, canActivate: [AuthGuard] },
  { path: 'ferias/ferias-detail',  component: FeriasDetailComponent, canActivate: [AuthGuard] },
  { path: 'ferias/:codigo',  component: FeriasDetailComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginFormComponent },


    // deve ser sempre a última linha da matriz de menus.
    { path: '**', redirectTo: 'pagina-nao-encontrada' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatSliderModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
