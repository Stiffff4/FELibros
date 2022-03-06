import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LibroService {
  private myAppUrl = 'https://localhost:44334/';
  private myApiUrl = 'api/Libro/';

  constructor(private http: HttpClient) { }

  getListLibros(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + "ObtenerLibros");
  }


  deleteLibro(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + "EliminarLibro/" + id);
  }

  saveLibro(libro: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + "AgregarLibro", libro);
  }

  updateLibro(id: number, libro: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + "EliminarLibro/" + id, libro);
  }
}
