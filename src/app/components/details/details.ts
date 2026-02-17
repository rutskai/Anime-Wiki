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
  // anime?: Anime;
   anime:any={};

  constructor(private animeService: AnimeService,private cdr:ChangeDetectorRef, private route: ActivatedRoute, private router: Router){
  }

  ngOnInit(){
     const id = this.route.snapshot.paramMap.get('id');
     if(!id) return;
     this.loadAnime(id);
    
  }

  loadAnime(id:string){
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
