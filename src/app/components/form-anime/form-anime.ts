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

  constructor(private animeService: AnimeService,private router: Router) {}
   
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

   cancel(): void {
    this.router.navigate(['/']);
  }

}
