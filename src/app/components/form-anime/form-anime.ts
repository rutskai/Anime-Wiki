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

  constructor(private animeService: AnimeService,private router: Router, private route: ActivatedRoute) {}
   
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

  onSubmit(): void {
    if(this.id){
      this.update();
    }else{
      this.create();
    }
  }

  create(){
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

 update(): void {
  if(this.animeForm.valid){
    const animeData: Anime = this.animeForm.value;
    this.animeService.update(this.id!, animeData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error('Error al actualizar:', err)
    });
  }
  }

   cancel(): void {
    this.router.navigate(['/']);
  }

}
