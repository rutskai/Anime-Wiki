import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id:string | null = null;

  statusOptions = ['En emisión', 'Finalizado', 'Pendiente'];


  /**
   * Constructor del componente FormAnime
   * Inicializa los servicios necesarios para gestionar animes,
   * navegar entre páginas y acceder a los parámetros de la ruta
   *
   * @param {AnimeService} animeService - Servicio para gestionar los datos de los animes
   * @param {Router} router - Servicio para navegar entre las páginas
   * @param {ActivatedRoute} route - Servicio para acceder a los parámetros de la ruta activa
   */
  constructor(private animeService: AnimeService,private router: Router, private route: ActivatedRoute) {}
   
  /**
   * Inicializa el componente creando el formulario reactivo con sus campos y validadores
   * Si existe un id en la ruta, carga los datos del anime correspondiente
   * y rellena el formulario con ellos para su edición
   *
   * @returns {void}
   */
 ngOnInit(): void {
    this.animeForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      synopsis: new FormControl('', [Validators.required, Validators.minLength(10)]),
      genre: new FormControl('', [Validators.required]),
      episodes: new FormControl(1, [Validators.required, Validators.min(1)]),
      score: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      status: new FormControl('Pendiente', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      year: new FormControl(2024, [Validators.required, Validators.min(1960), Validators.max(2030)])
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
       this.animeService.getById(this.id).subscribe({
        next: (data) => {
          this.animeForm.patchValue(data);
        },
        error: (err) => console.error('Error al cargar anime:', err)
      });
    }
  }

    /**
   * Maneja el envío del formulario decidiendo si crear o actualizar el anime
   * Si existe un id llama a update(), si no existe llama a create()
   *
   * @returns {void}
   */
  onSubmit(): void {
    if(this.id){
      this.update();
    }else{
      this.create();
    }
  }

  /**
   * Crea un nuevo anime en el servidor con los datos del formulario
   * Si el formulario es válido, envía los datos y redirige a la página principal.
   * Si ocurre un error durante la creación, lo muestra por consola
   *
   * @returns {void}
   */
  create():void{
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
   * Actualiza un anime existente en el servidor con los datos del formulario
   * Si el formulario es válido, envía los datos actualizados y redirige a la página principal.
   * Si ocurre un error durante la actualización, lo muestra por consola
   *
   * @returns {void}
   */

 update(): void {
  if(this.animeForm.valid){
    const animeData: Anime = this.animeForm.value;
    this.animeService.update(this.id!, animeData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error('Error al actualizar:', err)
    });
  }
  }

    /**
   * Cancela la operación actual y redirige a la página principal
   *
   * @returns {void}
   */

   cancel(): void {
    this.router.navigate(['/']);
  }

}
