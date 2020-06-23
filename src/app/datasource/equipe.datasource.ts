import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';
import { EquipeService } from './../service/equipeservice';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { Equipe } from './../model/equipe.model';


export class EquipeDataSource implements DataSource<Equipe>{
  public equipesSubject = new BehaviorSubject<Equipe[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    recordsTotal;
    public loading$ = this.loadingSubject.asObservable();
    constructor(private equipeService: EquipeService){}
    connect(collectionViewer: CollectionViewer): Observable<Equipe[]> {
      return this.equipesSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.equipesSubject.complete();
    this.loadingSubject.complete();
  }
  carregar(){
    this.loadingSubject.next(true);
    this.equipeService.listar().pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe(response => {
                this.equipesSubject.next(response['content']);
                this.recordsTotal = response['pageSize'];
            });
  }
  changeLoading(valor: boolean) {
    this.loadingSubject.next(valor);
  }
}

