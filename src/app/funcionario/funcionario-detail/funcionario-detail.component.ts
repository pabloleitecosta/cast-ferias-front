import { Title } from '@angular/platform-browser';
import { FuncionarioService } from './../../service/funcionarioservice';
import { EquipeService } from './../../service/equipeservice';
import { Equipe } from './../../model/equipe.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-funcionario-detail',
  templateUrl: './funcionario-detail.component.html',
  styleUrls: ['./funcionario-detail.component.css'],
  providers:[]
})
export class FuncionarioDetailComponent implements OnInit {
  frmFuncionario: FormGroup;
  equipes: Equipe[];
  codigo: number;
  tituloTela: string;
  codigoFuncionario:number;
  private subscription: Subscription;
  constructor(private rota: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private equipeService: EquipeService,
    private funcionarioService: FuncionarioService,
    private titulo: Title) { }

  ngOnInit(): void {
    this.frmFuncionarioBinding();
    this.carregarEquipes();
    this.codigoFuncionario = this.route.snapshot.params['codigo'];

    if (this.codigoFuncionario){
      this.carregarFuncionario(this.codigoFuncionario);
      this.tituloTela = 'Funcionário - Alterar';
    }else{
      this.tituloTela = 'Funcionário - Adicionar';
    }    
  }
  frmFuncionarioBinding(){
    // devolve uma instância da classe Build
    this.frmFuncionario = this.formBuilder.group({
                                              nome: [null, [Validators.required, Validators.maxLength(100)] ],
                                              rua: [null, [Validators.required, Validators.maxLength(100)] ],
                                              numero: [null, [Validators.required, Validators.maxLength(10)] ],
                                              complemento: [null, [Validators.required, Validators.maxLength(100)] ],
                                              bairro: [null, [Validators.required, Validators.maxLength(100)] ],
                                              cidade: [null, [Validators.required, Validators.maxLength(100)] ],
                                              estado: [null, [Validators.required, Validators.maxLength(100)] ],
                                              dataNascimento: [null, [Validators.required]],
                                              dataContratacao: [null, [Validators.required]],
                                              foto: [null],
                                              equipe: [null, Validators.required],
                                            });
  }


  carregarFuncionario(codigo: number){

    this.funcionarioService.porId(codigo)
    .then(funcRetorno => {
                             this.frmFuncionario.patchValue(funcRetorno);
                             this.equipes.push(funcRetorno.equipe);
                           });
  }

  carregarEquipes(){
    this.equipeService.getEquipes()
    .then( equipe => { this.equipes = equipe; });
  }

  carregarMatricula(codigo: number){

    this.funcionarioService.porMaatricula(codigo)
    .then(FuncionarioRetorno => {
                             this.frmFuncionario.patchValue(FuncionarioRetorno);
                             this.equipes.push(FuncionarioRetorno.equipe);
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
      this.funcionarioService.salvar(this.frmFuncionario.value)
                        .then(funcionarioSalvo =>{
                                              this.rota.navigate(['/funcionarios']);
                                            })
                        .catch(erro => { alert('Erro: ' + JSON.stringify(erro.error.message))});
    }
    editar(){
      this.funcionarioService.atualizar(this.frmFuncionario.value)
                        .then( funcionario => {
                                                  this.rota.navigate(['/funcionarios']);
                                                })
                        .catch(erro =>{
                                      });
    }
}
