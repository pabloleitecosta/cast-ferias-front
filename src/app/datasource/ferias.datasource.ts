import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { FeriasFuncionario } from '../model/ferias.model';
import { FeriasService } from '../service/ferias.service';

export class FeriasDataSource implements DataSource<FeriasFuncionario> {
  public feiasSubject = new BehaviorSubject<FeriasFuncionario[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  recordsTotal;
  public loading$ = this.loadingSubject.asObservable();
  constructor(private feriasService: FeriasService){}
  connect(collectionViewer: CollectionViewer): Observable<FeriasFuncionario[]> {
    return this.feiasSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.feiasSubject.complete();
    this.loadingSubject.complete();
  }
  carregar(){
    this.loadingSubject.next(true);
    this.feriasService.listar().pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe(response => {
                this.feiasSubject.next(response['content']);
                this.recordsTotal = response['pageSize'];
            });
  }
  changeLoading(valor: boolean) {
    this.loadingSubject.next(valor);
  }
}
