import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuperherosI } from '../interfaces/superheros';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SuperherosService {

  constructor(private _http: HttpClient) { }

  public getAllSuperHeros(): Observable<SuperherosI[]> {
    return this._http.get<SuperherosI[]>(environment.url);
  }

  public getSuperHeroById(idSuper: String): Observable<SuperherosI> {
    return this._http.get<SuperherosI>(`${environment.url}/${idSuper}`);
  }

  public deleteSuperHeroById(idSuper: String) {
    return this._http.delete(`${environment.url}/${idSuper}`);
  }

  public createSuperHeros(superherosI: SuperherosI): Observable<SuperherosI> {
    superherosI.id = uuidv4();
    return this._http.post<SuperherosI>(environment.url, superherosI);
  }

  public updateSuperHeros(superherosI: SuperherosI): Observable<SuperherosI> {
    return this._http.put<SuperherosI>(`${environment.url}/${superherosI.id}`, superherosI);
  }

}
