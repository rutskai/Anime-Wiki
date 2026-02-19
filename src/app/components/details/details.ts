import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from '../../models/anime.model';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit{

   anime:Anime={
     id: '',
     title: '',
     synopsis: '',
     genre: '',
     episodes: 0,
     score: 0,
     status: 'En emisión',
     imageUrl: '',
     year: 0
   };
  
   /**
   * Constructor del componente Details
   * Inicializa los servicios necesarios para obtener el anime,
   * detectar cambios en la vista, leer parámetros de la ruta y navegar entre páginas
   *
   * @param {AnimeService} animeService - Servicio para obtener los datos del anime
   * @param {ChangeDetectorRef} cdr - Servicio para forzar la detección de cambios en la vista
   * @param {ActivatedRoute} route - Servicio para acceder a los parámetros de la ruta activa
   * @param {Router} router - Servicio para navegar entre las páginas
   */

  constructor(private animeService: AnimeService,private cdr:ChangeDetectorRef, private route: ActivatedRoute, private router: Router){
  }


  /**
   * Inicializa el componente obteniendo el id de la ruta
   * Si no existe el id, aborta la carga. Si existe, llama a loadAnime
   *
   * @returns {void}
   */

  ngOnInit():void{
     const id = this.route.snapshot.paramMap.get('id');
     if(!id) return;
     this.loadAnime(id);
    
  }

  /**
   * Obtiene los datos de un anime por su id y los almacena en la propiedad anime
   * Si ocurre un error durante la carga, redirige a la página principal
   *
   * @param {string} id - Identificador único del anime a cargar
   * @returns {void}
   */

  loadAnime(id:string): void{
      this.animeService.getById(id).subscribe({
        next: (data) => {
          this.anime = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al obtener el anime:', err);
          this.router.navigate(['/']);
        }
      });
    }


}
