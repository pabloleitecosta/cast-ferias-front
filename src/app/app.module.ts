import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipeDetailComponent } from './equipe/equipe-detail/equipe-detail.component';
import { PrincipalComponent } from './principal/principal.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { FuncionarioDetailComponent } from './funcionario/funcionario-detail/funcionario-detail.component';
import { FuncionarioListComponent } from './funcionario/funcionario-list/funcionario-list.component';
import { EquipeListComponent } from './equipe/equipe-list/equipe-list.component';
import { MessageComponent } from './shared/message.component';
import { HttpClientModule } from '@angular/common/http';
import { SegurancaModule } from './seguranca/seguranca.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { FeriasListComponent } from './ferias/ferias-list/ferias-list.component';
import { FeriasDetailComponent } from './ferias/ferias-detail/ferias-detail.component';

registerLocaleData(ptBr);


@NgModule({
  declarations: [
    AppComponent,
    EquipeDetailComponent,
    PrincipalComponent,
    MenuPrincipalComponent,
    EquipeListComponent,
    FuncionarioDetailComponent,
    FuncionarioListComponent,
    MessageComponent,
    LoginFormComponent,
    FeriasListComponent,
    FeriasDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SegurancaModule,
    FormsModule,
    /* Angular Material */
    MatToolbarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTooltipModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    MessageComponent
  ],
  providers: [

    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }