import { Resources } from './../../shared/resources';
import { Equipe } from './../../model/equipe.model';
import { EquipeService } from './../../service/equipeservice';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-equipe-detail',
  templateUrl: './equipe-detail.component.html',
  styleUrls: ['./equipe-detail.component.css'],
  providers: [FormBuilder]
})
export class EquipeDetailComponent implements OnInit {
  frmEquipe: FormGroup;
  equipes: Equipe[];
  codigo: number;
  tituloTela: string;
  private subscription: Subscription;
  constructor(private rota: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private equipeService: EquipeService,
    private titulo: Title) { }

  ngOnInit(): void {
    this.frmEquipeBinding();
    this.carregarEquipes();
    this.codigo = this.route.snapshot.params['id'];
    if (this.codigo){
      this.carregarPorCodigo(this.codigo);
      this.tituloTela = 'Equipe - Alterar';
    }else{
      this.tituloTela = 'Equipe - Adicionar';
    }
    this.titulo.setTitle(Resources.CAST_GROUP);
  }
  frmEquipeBinding(){
    this.frmEquipe = this.formBuilder.group({
      id: [],
      nmequipe: [null, [Validators.required, Validators.maxLength(100)] ],
                                            });
  }
  carregarEquipes(){
    this.equipeService.getEquipes()
    .then( equipe => { this.equipes = equipe; });
  }
  carregarPorCodigo(codigo: number){
    this.equipeService.porId(codigo)
    .then(equipeRetorno => {
      this.frmEquipe.patchValue(equipeRetorno);
      this.equipes.push(equipeRetorno.equipe);
    });
  }
  /*======================================
                Logica da Tela
   =======================================*/
   onVoltar(){
    this.rota.navigate(['/principal']);
   }
   get editando(){
    return Boolean(this.codigo);
   }
   onSalvar(){
    if (this.editando){
            this.editar();
        }else{
            this.adicionar();
        }
     }
     adicionar(){
      this.equipeService.salvar(this.frmEquipe.value)
                        .then(equipeSalvo =>{
                                              this.rota.navigate(['/equipes']);
                                            })
                        .catch(erro => { alert('Erro: ' + JSON.stringify(erro.error.message))
                      });
    }
    editar(){
      this.equipeService.atualizar(this.frmEquipe.value)
                        .then( equipe => {
                                                  this.rota.navigate(['/equipes']);
                                                })
                        .catch(erro =>{
                                      });
    }
}
