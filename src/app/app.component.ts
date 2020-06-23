import { Routes, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cast Ferias Funcionarios';
  constructor(private router: Router){}


  exibindoNavbar() {
    return this.router.url !== '/login';
  }

}
