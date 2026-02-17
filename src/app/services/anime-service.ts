import { Injectable } from '@angular/core';
import { Anime } from '../models/anime.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private apiUrl: string;

  constructor(private http: HttpClient){
    this.apiUrl="dxsg";

  }

   getAll(): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.apiUrl);
  }

    getById(id: string): Observable<Anime> {
    return this.http.get<Anime>(`${this.apiUrl}/${id}`);
  }

   create(anime: Anime): Observable<Anime> {
    return this.http.post<Anime>(this.apiUrl, anime);
  }

   delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
