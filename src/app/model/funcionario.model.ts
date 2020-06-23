import { Equipe } from './equipe.model';
export class Funcionario{
  codigo: number;
  numeroMatricula: number;
  nome: string;
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  dataNascimento: string;
  dataContratacao: string;
  foto: string;
  equipe = new Equipe();
}
