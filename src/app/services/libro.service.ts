import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private myAppUrl = 'https://localhost:44334/';
  private myApiUrl = 'api/libro/';

  constructor(private http: HttpClient) { }
  getListLibros(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }


  deleteLibro(id: number): Observable<any>{
return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveLibro(libro: any): Observable<any>{
return this.http.post(this.myAppUrl + this.myApiUrl, libro);
  }

updateLibro(id: number, libro: any): Observable<any>{
return this.http.put(this.myAppUrl + this.myApiUrl + id, libro);
}
}
