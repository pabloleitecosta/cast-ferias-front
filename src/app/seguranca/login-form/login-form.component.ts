import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ManipulaErroService } from 'src/app/service/manipula.erro.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [ManipulaErroService]
})
export class LoginFormComponent  {

  constructor(
    private auth: AuthService,
    private errorHandler: ManipulaErroService,
    private router: Router
  ) { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/principal']);
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

}
