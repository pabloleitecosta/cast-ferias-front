import { Title } from '@angular/platform-browser';
import { FuncionarioService } from './../../service/funcionarioservice';
import { EquipeService } from './../../service/equipeservice';
import { Equipe } from './../../model/equipe.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Funcionario } from 'src/app/model/funcionario.model';
import { FeriasService } from 'src/app/service/ferias.service';

@Component({
  selector: 'app-ferias-detail',
  templateUrl: './ferias-detail.component.html',
  styleUrls: ['./ferias-detail.component.css']
})
export class FeriasDetailComponent implements OnInit {

  frmLancamentoFerias: FormGroup;
  funcionarios: Funcionario[];
  codigo: number;
  tituloTela: string;
  codigoFerias: number;
  private subscription: Subscription;
  constructor(private rota: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private equipeService: EquipeService,
              private feriasService: FeriasService,
              private funcionarioService : FuncionarioService,
              private titulo: Title) { }

  ngOnInit(): void {
    this.frmLancamentoBinding();
    this.carregarFuncionarios();
    this.codigoFerias = this.route.snapshot.params['codigo'];

    if (this.codigoFerias){
      this.carregarFuncionario(this.codigoFerias);
      this.tituloTela = 'Férias - Alterar';
    }else{
      this.tituloTela = 'Férias - Lançamento';
    }
  }
  frmLancamentoBinding(){
    // devolve uma instância da classe Build
    this.frmLancamentoFerias = this.formBuilder.group({
                                              funcionario: [null, [Validators.required] ],
                                              dataInicio: [null, [Validators.required, Validators.maxLength(100)] ],
                                              dataTermino: [null, [Validators.required, Validators.maxLength(10)] ],
                                            });
  }


  carregarFuncionario(codigo: number){

    this.feriasService.porId(codigo)
    .then(feriasRetorno => {
                             this.frmLancamentoFerias.patchValue(feriasRetorno);
                             this.funcionarios.push(feriasRetorno.equipe);
                           });
  }

  carregarFuncionarios(){
    this.funcionarioService.getFuncionarios()
    .then( func => { this.funcionarios = func; });
  }

  carregarMatricula(codigo: number){

    this.funcionarioService.porMaatricula(codigo)
    .then(feriasRetorno => {
                             this.frmLancamentoFerias.patchValue(feriasRetorno);
                             this.funcionarios.push(feriasRetorno.funcionario);
                           });
  }
  onVoltar(){
    this.rota.navigate(['/principal']);
  }
  get editando(){
    return Boolean(this.codigo);
  }
  // Manipula Registros
  onSalvar(){

    if (this.editando){
            this.editar();
        }else{
            this.adicionar();
        }
     }
     adicionar(){
      this.feriasService.salvar(this.frmLancamentoFerias.value)
                        .then(funcionarioSalvo =>{
                                              this.rota.navigate(['/ferias']);
                                            })
                        .catch(erro => { alert('Erro: ' + JSON.stringify(erro.error.message))});
    }
    editar(){
      this.feriasService.atualizar(this.frmLancamentoFerias.value)
                        .then( funcionario => {
                                                  this.rota.navigate(['/ferias']);
                                                })
                        .catch(erro =>{
                                      });
    }
}



