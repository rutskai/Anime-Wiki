import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Anime } from '../../models/anime.model';
import { AnimeService } from '../../services/anime-service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-anime-card',
  imports: [RouterLink],
  templateUrl: './anime-card.html',
  styleUrl: './anime-card.css',
})
export class AnimeCard implements OnInit {
   animes: Anime[] = [];

    constructor(private animeService: AnimeService, private router: Router, private cdr: ChangeDetectorRef) {}

     ngOnInit(): void {
    this.animeService.getAll().subscribe({
      next: (data) => {
        this.animes = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener los animes:', err);
      }
    });
  }

  goToDetails(id:string){
    this.router.navigate(["/detailsAnime", id]);
  }

}
