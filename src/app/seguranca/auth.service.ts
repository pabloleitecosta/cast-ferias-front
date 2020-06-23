import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Erro } from '../model/erro';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic YW5ndWxhcjpAR2FzdEdyb3VwMjAyMEA=');

    const body = `client_id=angular&username=${usuario}&password=${senha}&grant_type=password`;

    console.error('login '+usuario+' Senha: '+senha);

    return this.http.post<any>(this.oauthTokenUrl, body,
                                { headers, withCredentials: true })
                  .toPromise()
                  .then(response => {
                    const retornoErro = response.content;
                    this.armazenarToken(response.access_token);
                  })
                  .catch(responseErro => {
                    const erro = responseErro.error;
                    if (responseErro.status === 400) {
                      return Promise.reject('Usuário ou senha inválida!');
                    }
                    console.error(JSON.stringify(responseErro));
                    return Promise.reject(responseErro);
                  });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic YW5ndWxhcjpAR2FzdEdyb3VwMjAyMEA=');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
        return Promise.resolve(null);
      })
      .catch(response => {
        return Promise.resolve(null);
      });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  public armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
