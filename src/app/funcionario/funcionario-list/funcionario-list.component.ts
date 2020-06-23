import { FuncionarioDataSource } from './../../datasource/funcionario.datasource';
import { ManipulaErroService } from './../../service/manipula.erro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/service/funcionarioservice';
import { Funcionario } from 'src/app/model/funcionario.model';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css'],
  providers: [ManipulaErroService]
})
export class FuncionarioListComponent implements OnInit {

  constructor(private rota: Router,
              private funcionarioService: FuncionarioService,
              private manipulaErro: ManipulaErroService) { }

    displayedColumns = ['numeroMatricula', 'nome', 'equipe', 'dataNascimento', 'dataContratacao', 'editar', 'excluir'];

    dataSource: FuncionarioDataSource;

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar(){
    this.dataSource = new FuncionarioDataSource(this.funcionarioService);
    this.dataSource.carregar();
  }


  onExcluir(func: Funcionario){

    this.funcionarioService.excluir(func.codigo)
        .then( () => {
                      this.inicializar();
                     })
        .catch( erro => {
          this.manipulaErro.handle(erro);
        });
  }

}
