import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Curso } from '../model/curso.model';
import { CursoService } from '../service/curso.service';
import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';


export class CursosDataSource implements DataSource<Curso> {

    public cursosSubject = new BehaviorSubject<Curso[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    recordsTotal;

    public loading$ = this.loadingSubject.asObservable();

    constructor(private cursoService: CursoService){}

    connect(collectionViewer: CollectionViewer): Observable<Curso[]> {
        return this.cursosSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.cursosSubject.complete();
        this.loadingSubject.complete();
    }

    carregar(){
        this.loadingSubject.next(true);
        this.cursoService.listar().pipe(
                    catchError(() => of([])),
                    finalize(() => this.loadingSubject.next(false))
                ).subscribe(response => {
                    console.error(JSON.stringify(response));
                    this.cursosSubject.next(response['content']);
                    this.recordsTotal = response['pageSize'];
                });
    }

    changeLoading(valor: boolean) {
        this.loadingSubject.next(valor);
    }
}
