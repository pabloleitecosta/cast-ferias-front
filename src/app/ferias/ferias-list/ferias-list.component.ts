import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeriasService } from 'src/app/service/ferias.service';
import { FeriasFuncionario } from 'src/app/model/ferias.model';
import { FeriasDataSource } from 'src/app/datasource/ferias.datasource';

@Component({
  selector: 'app-ferias-list',
  templateUrl: './ferias-list.component.html',
  styleUrls: ['./ferias-list.component.css']
})
export class FeriasListComponent implements OnInit {

  constructor(private rota: Router,
              private feriasService: FeriasService) { }

displayedColumns = ['funcionario', 'dataInicio', 'dataTermino', 'editar', 'excluir'];

dataSource: FeriasDataSource;

ngOnInit(): void {
this.inicializar();
}

inicializar(){
this.dataSource = new FeriasDataSource(this.feriasService);
this.dataSource.carregar();
}


onExcluir(ferias: FeriasFuncionario){

this.feriasService.excluir(ferias.codigo)
.then( () => {
            this.inicializar();
           })
.catch( erro => {
//this.manipulaErro.handle(erro);
});
}

}
