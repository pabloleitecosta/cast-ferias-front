import { Equipe } from './../../model/equipe.model';
import { EquipeDataSource } from './../../datasource/equipe.datasource';
import { EquipeService } from './../../service/equipeservice';
import { ManipulaErroService } from './../../service/manipula.erro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipe-list',
  templateUrl: './equipe-list.component.html',
  styleUrls: ['./equipe-list.component.css'],
  providers: [ManipulaErroService]
})
export class EquipeListComponent implements OnInit {

  constructor(private rota: Router,
              private equipeService: EquipeService) { }

  displayedColumns = ['id', 'nmequipe', 'quantidadeEquipes', 'editar', 'excluir'];
  dataSource: EquipeDataSource;

  ngOnInit(): void {
    this.inicializar();
  }
  inicializar(){
    this.dataSource = new EquipeDataSource(this.equipeService);
    this.dataSource.carregar();
  }
  onExcluir(equipe: Equipe){
    this.equipeService.excluir(equipe.id)
        .then( () =>{
                      this.inicializar();
                     })
        .catch( erro =>{
          //this.manipulaErro.handle(erro);
        });
  }
}
