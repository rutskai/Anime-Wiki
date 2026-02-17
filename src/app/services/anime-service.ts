import { Injectable } from '@angular/core';
import { Anime } from '../models/anime.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient){
    this.apiUrl="https://69949961fade7a9ec0f5da76.mockapi.io/Anime";

  }

   getAll(): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.apiUrl);
  }

    getById(id: string): Observable<Anime> {
       if (!id) {
    throw new Error('ID es requerido');
  }
    return this.http.get<Anime>(`${this.apiUrl}/${id}`);
  }

   create(anime: Anime): Observable<Anime> {
    return this.http.post<Anime>(this.apiUrl, anime);
  }

    update(id: string, anime: Anime): Observable<Anime> {
    return this.http.put<Anime>(`${this.apiUrl}/${id}`, anime);
  }

   delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
