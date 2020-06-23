import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';
import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';


export class CategoriasDataSource implements DataSource<Categoria> {

    public categoriasSubject = new BehaviorSubject<Categoria[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    recordsTotal;

    public loading$ = this.loadingSubject.asObservable();

    constructor(private categoriaService: CategoriaService){}

    connect(collectionViewer: CollectionViewer): Observable<Categoria[]> {
        return this.categoriasSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.categoriasSubject.complete();
        this.loadingSubject.complete();
    }

    carregar(){
        this.loadingSubject.next(true);
        this.categoriaService.listar().pipe(
                    catchError(() => of([])),
                    finalize(() => this.loadingSubject.next(false))
                ).subscribe(response => {
                    this.categoriasSubject.next(response['content']);
                    this.recordsTotal = response['pageSize'];
                });
    }

    changeLoading(valor: boolean) {
        this.loadingSubject.next(valor);
    }
}
