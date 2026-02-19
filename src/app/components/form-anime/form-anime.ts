import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Anime } from '../../models/anime.model';
import { AnimeService } from '../../services/anime-service';

@Component({
  selector: 'app-form-anime',
  imports: [ReactiveFormsModule],
  templateUrl: './form-anime.html',
  styleUrl: './form-anime.css',
})
export class FormAnime implements OnInit{

  animeForm!: FormGroup;

  statusOptions = ['En emisión', 'Finalizado', 'Pendiente'];

  /**
   * Constructor del componente FormAnime
   * Inicializa los servicios necesarios para gestionar animes y navegar entre páginas
   *
   * @param {AnimeService} animeService - Servicio para gestionar los datos de los animes
   * @param {Router} router - Servicio para navegar entre las páginas
   */

  constructor(private animeService: AnimeService,private router: Router) {}
   
   /**
   * Inicializa el componente creando el formulario reactivo con sus campos y validadores
   * Crea el FormGroup con los campos correspondientes aplicando validaciones
   * obligatorias, de longitud mínima, de rango numérico y de formato de URL
   *
   * @returns {void}
   */

    ngOnInit(): void {
      this.animeForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      synopsis: new FormControl('', [Validators.required, Validators.minLength(10)]),
      genre: new FormControl('', [Validators.required]),
      episodes: new FormControl(1, [Validators.required, Validators.min(1)]),
      score: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(10)]),
      status: new FormControl('Pendiente', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      year: new FormControl(2024, [Validators.required, Validators.min(1960), Validators.max(2030)])
    });

  }

  /**
   * Maneja el envío del formulario y crea un nuevo anime en el servidor
   * Si el formulario es válido, envía los datos y redirige a la página principal.
   * Si ocurre un error durante la creación, lo muestra por consola
   *
   * @returns {void}
   */

  onSubmit(): void {
    if (this.animeForm.valid) {
      const animeData: Anime = this.animeForm.value;
      
      this.animeService.create(animeData).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al crear:', err);
        }
      });
    }
  }

   /**
   * Cancela la creación del anime y redirige a la página principal
   *
   * @returns {void}
   */

   cancel(): void {
    this.router.navigate(['/']);
  }

}
