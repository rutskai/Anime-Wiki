import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Anime } from '../../models/anime.model';
import { AnimeService } from '../../services/anime-service';
import { Router} from "@angular/router";

@Component({
  selector: 'app-anime-card',
  imports: [],
  templateUrl: './anime-card.html',
  styleUrl: './anime-card.css',
})
export class AnimeCard implements OnInit {
   animes: Anime[] = [];

   /**
   * Constructor del componente AnimeCard
   * Inicializa los servicios necesarios para obtener los animes,
   * navegar entre páginas y detectar cambios en la vista
   *
   * @param {AnimeService} animeService - Servicio para obtener los datos de los animes
   * @param {Router} router - Servicio para navegar entre las páginas
   * @param {ChangeDetectorRef} cdr - Servicio para forzar la detección de cambios en la vista
   */

    constructor(private animeService: AnimeService, private router: Router, private cdr: ChangeDetectorRef) {}

    /**
   * Inicializa el componente obteniendo la lista de animes del servidor
   * Suscribe al observable de getAll() y almacena los datos recibidos,
   * forzando la detección de cambios al recibirlos
   *
   * @returns {void}
   */

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

  /**
   * Navega a la página de detalles del anime seleccionado
   *
   * @param {string} id - Identificador único del anime al que navegar
   * @returns {void}
   */

  goToDetails(id:string): void{
    this.router.navigate(["/detailsAnime", id]);
  }

}
