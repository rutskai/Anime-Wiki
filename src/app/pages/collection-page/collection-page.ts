import { Component } from '@angular/core';
import { AnimeCard } from "../../components/anime-card/anime-card";

@Component({
  selector: 'app-collection-page',
  imports: [AnimeCard],
  templateUrl: './collection-page.html',
  styleUrl: './collection-page.css',
})
export class CollectionPage {

}
