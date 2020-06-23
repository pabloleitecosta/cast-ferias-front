import { AuthService } from './../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  exibindoMenu = false;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
